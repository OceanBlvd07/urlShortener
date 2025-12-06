# URL Shortener

A simple and fast web application for shortening long URLs.  
Built with **Node.js**, **Express**, **MongoDB**, **TailwindCSS**, **DaisyUI**, and **EJS templates**.  
Live demo: [https://shrturl01.vercel.app](https://shrturl01.vercel.app)

---

## 🔹 Features

| Feature | Description |
|---------|-------------|
| Shorten URLs | Enter any long URL and get a compact, shareable link |
| Copy to Clipboard | Copy short links with one click |
| Redirect | Automatic redirect from short link to original URL |
| Persistent Storage | Stores all links in MongoDB |
| Simple, Responsive UI | Clean design using TailwindCSS + DaisyUI |
| Optional Simple User | User can “log in” with email only; **no password is required** for simplicity, so the app stays lightweight and easy to demo |
| Protected Routes | Certain routes accessible only to logged-in users |
| Delete Links | Ability to remove short links |

---

## 🔹 Upcoming Features

| Feature | Description |
|---------|-------------|
| Full User Registration & Login | Email + password authentication |
| Edit Links | Ability to edit short links (e.g. give a name to it)|
| Click Statistics | Track number of clicks for each short link |
| Enhanced UI/UX | More DaisyUI components and polished design |

> ⚠️ **Note:** Currently, the simple user login does **not require a password**. This is intentional to keep the project lightweight and focused on demonstrating full-stack skills, rather than full authentication security. In a real production app, proper password hashing and authentication would be required.

---

## 🔹 Technologies

- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Frontend:** TailwindCSS, DaisyUI, EJS templates  
- **Others:** express-session, dotenv, crypto  

---

## 🔹 Installation & Usage

1. Clone the repository:  
    ```bash
    git clone https://github.com/YOUR_USERNAME/urlShortener.git
    cd urlShortener
    ```
2. Install dependencies:  
    ```bash
    npm install
    ```
3. Create a `.env` file and add your MongoDB URI:  
    ```
    MONGODB_URI=your_mongodb_connection_string
    ```
4. Start the server:  
    ```bash
    npx nodemon server.js
    ```
    or  
    ```bash
    node server.js
    ```
5. Open your browser and go to:  
    ```
    http://localhost:8080
    ```

---

## 🔹 Project Structure
urlShortener/
├─ public/ # Static files (CSS, JS)
├─ views/ # EJS templates
├─ server.js # Main Express server
├─ package.json
├─ package-lock.json
└─ .env # Environment variables
