<div align="center">

# ☕ Chai Backend

### A Modern JavaScript Backend Built with Node.js & Express

<p>
  <b>Learn • Build • Understand • Ship</b>
</p>

<p>
  A backend development project inspired by the
  <a href="https://www.youtube.com/@chaiaurcode">Chai aur Code</a>
  backend series.
</p>

<p>
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose"/>
</p>

<p>
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Cloudinary-Media-3448C5?style=flat-square&logo=cloudinary&logoColor=white" alt="Cloudinary"/>
  <img src="https://img.shields.io/badge/Bcrypt-Security-3B3B3B?style=flat-square" alt="Bcrypt"/>
  <img src="https://img.shields.io/badge/JavaScript-ESM-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/>
</p>

<br/>

<a href="https://github.com/adityawatode/chai-backend">
  <img src="https://img.shields.io/github/stars/adityawatode/chai-backend?style=social" alt="GitHub Stars"/>
</a>
&nbsp;
<a href="https://github.com/adityawatode/chai-backend/forks">
  <img src="https://img.shields.io/github/forks/adityawatode/chai-backend?style=social" alt="GitHub Forks"/>
</a>

</div>

---

## 📖 About The Project

**Chai Backend** is a JavaScript backend development project created to explore and implement real-world backend concepts using **Node.js, Express.js, MongoDB, and modern JavaScript**.

The project focuses on understanding how a production-style backend is structured — from handling HTTP requests and database operations to authentication, file uploads, media management, middleware, security, and API architecture.

> ☕ **The goal isn't just to make an API work — it's to understand what happens behind the scenes.**

---

## ✨ What This Project Covers

The project brings together several important backend technologies and concepts:

| Area                     | Technology / Concept           |
| ------------------------ | ------------------------------ |
| 🟨 Runtime               | Node.js                        |
| 🚂 Server                | Express.js                     |
| 🍃 Database              | MongoDB                        |
| 🧩 ODM                   | Mongoose                       |
| 🔐 Authentication        | JWT                            |
| 🔑 Password Security     | bcrypt                         |
| ☁️ Media Storage         | Cloudinary                     |
| 📤 File Uploads          | Multer                         |
| 🌐 Cross-Origin Requests | CORS                           |
| ⚙️ Configuration         | dotenv                         |
| 📄 Pagination            | mongoose-aggregate-paginate-v2 |
| 🧹 Code Formatting       | Prettier                       |
| 🔄 Development           | Nodemon                        |
| 📦 Modules               | ES Modules                     |

---

## 🏗️ Architecture

The project follows a modular backend structure designed to keep responsibilities separated and the codebase maintainable.

```text
chai-backend/
│
├── 📁 public/
│   └── 📁 temp/
│
├── 📁 src/
│   ├── 📁 controllers/      # Request handling & business logic
│   ├── 📁 db/              # Database connection
│   ├── 📁 middlewares/     # Custom middleware
│   ├── 📁 models/          # Mongoose schemas & models
│   ├── 📁 routes/          # API routes
│   ├── 📁 utils/           # Reusable utilities
│   ├── 📄 app.js           # Express application
│   └── 📄 index.js         # Application entry point
│
├── 🔐 .env-sample
├── 🚫 .gitignore
├── ✨ .prettierrc
├── 📦 package.json
├── 🔒 package-lock.json
└── 📖 Readme.md
```

> **Note:** The exact contents of `src/` can evolve as the project grows.

---

# 🚀 Getting Started

Follow the steps below to run the project locally.

## 📋 Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) — v20+ recommended
* [MongoDB](https://www.mongodb.com/)
* Git
* A Cloudinary account if you are using media upload functionality

Check your installations:

```bash
node --version
npm --version
git --version
```

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/adityawatode/chai-backend.git
```

### 2. Navigate into the project

```bash
cd chai-backend
```

### 3. Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

You can use the provided environment template as a starting point:

```bash
cp .env-sample .env
```

Then configure the required environment variables for your local setup.

Example:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ **Never commit your `.env` file to GitHub.**
>
> Environment variables may contain credentials and secrets that should remain private.

---

# ▶️ Running the Project

Start the development server with:

```bash
npm run dev
```

The project uses **Nodemon**, so the development server automatically restarts whenever you make changes to the source code.

Once running, your server will typically be available at:

```text
http://localhost:8000
```

> The exact port depends on your `PORT` environment variable.

---

# 🔐 Authentication

Authentication is designed around modern token-based authentication concepts.

### 🔑 JWT

JSON Web Tokens are used to handle authenticated sessions.

The project uses separate concepts for:

* Access tokens
* Refresh tokens
* Token expiration
* Protected routes
* Authentication middleware

### 🔒 Password Hashing

User passwords should never be stored as plain text.

The project uses **bcrypt** to securely hash passwords before storing them in the database.

```text
User Password
      │
      ▼
   bcrypt
      │
      ▼
Hashed Password
      │
      ▼
   MongoDB
```

---

# ☁️ Media Management

The backend integrates with **Cloudinary** for media management.

This makes it possible to separate application logic from media storage and use a dedicated cloud service for uploaded assets.

The project also uses **Multer** for handling incoming multipart/form-data uploads.

```text
Client
  │
  │ Upload
  ▼
Express API
  │
  ▼
Multer
  │
  ▼
Backend Processing
  │
  ▼
Cloudinary
  │
  ▼
Media URL
```

---

# 🗄️ Database

The application uses:

### 🍃 MongoDB

MongoDB provides the persistent data layer.

### 🧩 Mongoose

Mongoose provides:

* Schema definitions
* Models
* Validation
* Query helpers
* Relationships/references
* Middleware
* Database abstraction

The project also includes:

```text
mongoose-aggregate-paginate-v2
```

for working with aggregation-based pagination.

---

# 🧱 Core Backend Concepts

This project is intended to provide practical exposure to several backend concepts:

### 🌐 API Development

Building HTTP APIs using Express.js.

### 🛣️ Routing

Organizing endpoints into logical route modules.

### 🎯 Controllers

Keeping request-handling and business logic separated from route definitions.

### 🧩 Middleware

Using middleware for concerns such as:

* Authentication
* Request processing
* File uploads
* Error handling
* CORS
* Cookies

### 🗃️ Models

Defining structured MongoDB data models using Mongoose.

### 🔐 Security

Applying concepts such as:

* Password hashing
* JWT authentication
* Environment-based secrets
* Cookie handling
* CORS configuration

### 📄 Pagination

Handling large datasets efficiently through pagination and aggregation.

---

# 📦 Dependencies

Some of the major dependencies used by the project include:

```text
express
mongoose
mongodb
jsonwebtoken
bcrypt
cloudinary
multer
cookie-parser
cors
dotenv
mongoose-aggregate-paginate-v2
```

Development tooling includes:

```text
nodemon
prettier
```

---

# 🧪 Development Workflow

A typical development workflow looks like:

```text
       ┌───────────────┐
       │    Client     │
       └───────┬───────┘
               │
               ▼
       ┌───────────────┐
       │    Routes     │
       └───────┬───────┘
               │
               ▼
       ┌───────────────┐
       │  Middleware   │
       └───────┬───────┘
               │
               ▼
       ┌───────────────┐
       │  Controllers  │
       └───────┬───────┘
               │
        ┌──────┴──────┐
        ▼             ▼
 ┌────────────┐ ┌────────────┐
 │  Mongoose  │ │ Cloudinary │
 └──────┬─────┘ └────────────┘
        │
        ▼
 ┌────────────┐
 │  MongoDB   │
 └────────────┘
```

---

# 🛠️ Scripts

Currently, the project provides a development script:

```bash
npm run dev
```

This runs the application using Nodemon and loads environment configuration through dotenv.

---

# 📚 Learning Resources

This project is part of the backend learning journey associated with **Chai aur Code**.

### 🎥 Chai aur Code

[![YouTube](https://img.shields.io/badge/YouTube-Chai%20aur%20Code-red?style=for-the-badge\&logo=youtube\&logoColor=white)](https://www.youtube.com/@chaiaurcode)

Explore the Chai aur Code channel for backend development tutorials and related learning material.

---

# 🎯 Learning Goals

The project is built around a simple philosophy:

```text
Learn the concept
      ↓
Understand the architecture
      ↓
Write the implementation
      ↓
Break things
      ↓
Debug
      ↓
Understand why it works
      ↓
Build better software
```

The objective is to gain practical experience with backend development rather than simply following isolated tutorials.

---

# 🔮 Future Improvements

Potential areas for continued development include:

* [ ] Complete and expand API documentation
* [ ] Add automated tests
* [ ] Add request validation
* [ ] Improve centralized error handling
* [ ] Add API documentation with Swagger/OpenAPI
* [ ] Add rate limiting
* [ ] Improve logging and monitoring
* [ ] Add Docker support
* [ ] Add CI/CD with GitHub Actions
* [ ] Deploy the backend to a cloud platform

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### 1. Fork the repository

```bash
git fork
```

### 2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make your changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

### 4. Push your branch

```bash
git push origin feature/amazing-feature
```

### 5. Open a Pull Request

Please keep contributions focused, clean, and well documented.

---

# 🐛 Issues & Suggestions

Found a bug or have an idea?

Feel free to open an issue:

👉 [Open an Issue](https://github.com/adityawatode/chai-backend/issues)

---

# 📜 License

This project is licensed under the **ISC License**.

See the `LICENSE` file for more information.

---

# 👨‍💻 Author

<div align="center">

### Aditya Watode

Backend Developer • JavaScript Enthusiast • Continuous Learner

<br/>

<a href="https://github.com/adityawatode">
  <img src="https://img.shields.io/badge/GitHub-Aditya%20Watode-181717?style=for-the-badge&logo=github" alt="GitHub"/>
</a>

</div>

---

# ⭐ Support

If you found this project useful or you're learning backend development along with it:

**Give the repository a ⭐ on GitHub!**

It helps the project get more visibility and motivates further development.

<br/>

<div align="center">

### ☕ Built with JavaScript, MongoDB & a lot of Chai.

**Happy Coding! 🚀**

</div>
