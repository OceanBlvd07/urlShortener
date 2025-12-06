# URL Shortener

A simple and fast web application for shortening long URLs.  
Built with **Node.js**, **Express**, **MongoDB**, **TailwindCSS**, **DaisyUI**, and **EJS templates**.  
Live demo: [https://shrturl01.vercel.app](https://shrturl01.vercel.app)

---

## 🔹 Features

| Feature | Description |
|---------|-------------|
| **Secure Input Validation** | Server-side validation ensures only valid URLs (http/https) are processed |
| **Error Handling** | User-friendly flash messages for invalid inputs using session storage |
| Shorten URLs | Enter any long URL and get a compact, shareable link |
| Copy to Clipboard | Copy short links with one click |
| Redirect | Automatic redirect from short link to original URL |
| Persistent Storage | Stores all links in MongoDB |
| Simple, Responsive UI | Clean design using TailwindCSS + DaisyUI |
| Optional Simple User | User can “log in” with email only; **no password is required** for simplicity |
| Protected Routes | Certain routes accessible only to logged-in users |
| Delete Links | Ability to remove short links for logged in users |

---

## 🔹 Upcoming Features

| Feature | Description |
|---------|-------------|
| Full User Registration & Login | Email + password authentication with hashing |
| Edit Links | Ability to edit short links (e.g., custom aliases)|
| Click Statistics | Track number of clicks for each short link |
| Enhanced UI/UX | More DaisyUI components and polished design |

> ⚠️ **Note:** Currently, the simple user login does **not require a password**. This is intentional to keep the project lightweight and focused on demonstrating full-stack skills, rather than full authentication security.

---

## 🔹 Technologies

- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Frontend:** TailwindCSS, DaisyUI, EJS templates  
- **Security:** express-session (with environment variables), crypto, server-side validation  
- **Tools:** dotenv, nodemon

---

## 🔹 Installation & Usage

1. **Clone the repository:** ```bash
    git clone [https://github.com/YOUR_USERNAME/urlShortener.git](https://github.com/YOUR_USERNAME/urlShortener.git)
    cd urlShortener
    ```

2. **Install dependencies:** ```bash
    npm install
    ```

3. **Configure Environment Variables:** Create a `.env` file in the root directory and add your MongoDB URI and a Session Secret:  
    ```env
    MONGODB_URI=your_mongodb_connection_string
    SESSION_SECRET=your_random_secure_string_here
    ```
    *(Note: The `SESSION_SECRET` can be any long random string used to sign the session ID cookie)*

4. **Start the server:** ```bash
    npm start
    ```
    *Or for development:*
    ```bash
    npx nodemon server.js
    ```

5. **Open your browser and go to:** ```
    http://localhost:8080
    ```

---

## 🔹 Project Structure

The project follows a standard Node.js structure using EJS for server-side rendering.
