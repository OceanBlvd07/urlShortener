const HTTP_PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"))

const crypto = require('crypto');

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")      
app.use(express.urlencoded({ extended: true }))


require("dotenv").config()  

const session = require('express-session')
app.use(session({
   secret: "the quick brown fox jumped over the lazy dog 1234567890",  // random string, used for configuring the session
   resave: false,
   saveUninitialized: true
}))


const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
   oldLink:String,
   newLink:String, 
   clicks:Number,
   user:{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }
})
const Url = new mongoose.model("Url", urlSchema)

const userSchema = new mongoose.Schema({
   email:String,
})
const User = new mongoose.model("Users", userSchema)

const generateShortId = () => {
  return crypto.randomBytes(3).toString("base64url");
}
const getFullUrl = (req, shortId) => {
    return `${req.protocol}://${req.get("host")}/${shortId}`
};


app.get("/", (req, res) => {
    if (req.session.userInfo) {
        return res.redirect("/0/dashboard");
    }
    const shortId = req.query.link || null
    let fullUrl = null
    if (shortId) {
        fullUrl = `${req.protocol}://${req.get("host")}/${shortId}`
    }

    res.render("home.ejs", { fullUrl });
});
app.post("/shorten", async (req, res) => {
    const original = req.body.txtLink
    const shortLink = generateShortId()

    const data = { oldLink: original, newLink: shortLink, clicks: 0 }
    if (req.session.userInfo) data.user = req.session.userInfo.id

    await Url.create(data)

    const fullUrl = getFullUrl(req, shortLink)

    if (req.session.userInfo) {
        return res.redirect("/0/dashboard")
    }
    return res.render("home.ejs", { fullUrl })
});

app.get("/:code", async (req, res) => {
    const currUrl = await Url.findOne({newLink: req.params.code})
    if(!currUrl){
        const errMsg = `
            The URL you are trying to access does not exist.
            Try using valid URL to shorten it.
            <a href="/">Return back</a>
        `
        return res.status(404).send(errMsg)
    }
    currUrl.clicks++
    await currUrl.save()

    return res.redirect(301, currUrl.oldLink)
})

app.get("/0/login", async (req, res) => {
    return res.render("login.ejs")
})
app.post("/login", async (req, res) => {
    const enteredEmail = req.body.txtEmail
    let user = await User.findOne({ email: enteredEmail })
    if (!user) {
        user = await User.create({ email: enteredEmail })
    }
    req.session.userInfo = {
        id: user._id,
        email: user.email
    };

    return res.redirect("/0/dashboard");
});
app.get("/0/dashboard", async (req, res) => {
    if (!req.session.userInfo) return res.redirect("/0/login");

    const urls = await Url.find({ user: req.session.userInfo.id });

    res.render("dashboard.ejs", {
        userEmail: req.session.userInfo.email,
        urls,
        host: `${req.protocol}://${req.get("host")}` 
    });
});
app.get("/delete/link/:link", async (req, res) => {
    await Url.findOneAndDelete({ _id: req.params.link });

    return res.redirect("/0/dashboard")
})
app.get("/0/logout", async (req, res) => {
    req.session.destroy()
    return res.redirect("/")
})






async function startServer() {    
    try {    
        await mongoose.connect(process.env.MONGODB_URI)

        console.log("SUCCESS connecting to MONGO database")
        console.log("STARTING Express web server")        
        
        app.listen(HTTP_PORT, () => {     
            console.log(`server listening on: http://localhost:${HTTP_PORT}`) 
        })    
    }
   
    catch (err) {        
        console.log("ERROR: connecting to MONGO database")
        console.log(err)
        console.log("Please resolve these errors and try again.")
    }
}
startServer()



