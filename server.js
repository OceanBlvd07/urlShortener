const HTTP_PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"))

const crypto = require('crypto');

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")      
app.use(express.urlencoded({ extended: true }))


require("dotenv").config()   

const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
   oldLink:String,
   newLink:String, 
   clicks:Number
})
const Url = new mongoose.model("url", urlSchema)

const generateShortId = () => {
  return crypto.randomBytes(3).toString("base64url");
}

app.get("/", (req, res) => {
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
    await Url.create({
        oldLink:original,
        newLink:shortLink,
        clicks:0
    });
    return res.redirect("/?link=" + shortLink)
});
app.get("/:code", async (req, res) => {
    const currUrl = await Url.findOne({newLink: req.params.code})
    if(!currUrl){
        return res.status(404).send("URL not found")
    }
    currUrl.clicks++
    await currUrl.save()

    return res.redirect(301, currUrl.oldLink)
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



