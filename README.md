Pixora - Image Enhancement Platform

<div align="center">

![Pixora Banner](https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80)

**Transform Your Images with Neural Magic**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0.3-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## Overview

Pixora is a modern, image enhancement platform built with the MERN stack (MongoDB, Express, React, Node.js). It enables users to transform low-resolution images into high-fidelity visuals using advanced image processing algorithms.

### Key Features

- **Smart Upscaling** - Increase image resolution up to 4x using AI
- **Denoise** - Remove noise and grain from photos
- **Sharpening** - Enhance image details and edges
- **Deblur** - Fix blurry images caused by camera shake
- **Color Correction** - Automatic color and contrast adjustment
- **⚡ Fast Processing** - Get results in seconds

---

##  Project Structure

```
image-enhancer/
├── 📂 public/                 # Static assets
├── 📂 src/                    # Frontend source code
│   ├── 📂 components/         # Reusable React components
│   │   ├── AuthForm.jsx      # Authentication form
│   │   ├── BeforeAfterSlider.jsx  # Image comparison slider
│   │   ├── Features.jsx       # Features showcase
│   │   ├── Gallery.jsx        # Image gallery
│   │   ├── Hero.jsx           # Landing hero section
│   │   ├── ImagePreview.jsx   # Image preview component
│   │   ├── ImageUpload.jsx    # Upload functionality
│   │   ├── Loading.jsx        # Loading states
│   │   └── Navbar.jsx         # Navigation bar
│   ├──  context/            # React context providers
│   │   └── AuthContext.jsx    # Authentication state
│   ├──  pages/              # Page components
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── Gallery.jsx       # User gallery
│   │   ├── Landing.jsx       # Landing page
│   │   ├── Login.jsx         # Login page
│   │   └── Signup.jsx        # Signup page
│   ├── routes/             # Route components
│   │   └── ProtectedRoute.jsx # Protected route wrapper
│   ├──  services/           # API services
│   │   ├── api.js            # Axios instance
│   │   └── image.js          # Image API calls
│   ├──  utils/              # Utility functions
│   │   └── enhanceImageApi.js # Image enhancement logic
│   ├── App.jsx               # Main app component
│   └── main.jsx              # App entry point
├── backend/                # Backend source code
│   ├──  config/             # Configuration files
│   │   └── db.js             # MongoDB connection
│   ├──  controllers/        # Route controllers
│   │   ├── authController.js # Authentication logic
│   │   └── imageController.js # Image processing logic
│   ├──  middleware/         # Express middleware
│   │   └── auth.js           # JWT authentication
│   ├──  models/             # Mongoose models
│   │   ├── Image.js          # Image schema
│   │   └── User.js           # User schema
│   ├──  routes/             # Express routes
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── imageRoutes.js    # Image endpoints
│   ├──  utils/              # Backend utilities
│   │   └── enhanceImageApi.js # Enhancement algorithms
│   └── server.js              # Server entry point
├──  .env.example            # Environment variables template
├──  .gitignore             # Git ignore rules
├──  eslint.config.js       # ESLint configuration
├──  package.json           # Frontend dependencies
├──  vite.config.js         # Vite configuration
└──  README.md              # This file

```

---

##  Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool
- **Tailwind CSS 4.1** - Styling framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 4.18.2** - Web framework
- **MongoDB 8.0.3** - Database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **Multer** - File uploads
- **Bcryptjs** - Password hashing

---

## Installation

### Prerequisites
- Node.js 20+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/image-enhancer.git
cd image-enhancer
```

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Setup Frontend

```bash
cd ..
npm install
```

### 4. Configure Environment Variables

Create `.env` file in the `backend/` directory:


```

### 5. Start Development Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
npm run dev
```

---



   ```

---

##  API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |

### Images

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/images/enhance` | Enhance an image |
| POST | `/api/images/save-enhanced` | Save enhanced image |
| GET | `/api/images` | Get user's images |
| GET | `/api/images/:id` | Get single image |
| DELETE | `/api/images/:id` | Delete image |

---

## Key Components

### BeforeAfterSlider
Interactive image comparison slider demonstrating enhancement effects.

```jsx
import BeforeAfterSlider from "./components/BeforeAfterSlider";

<BeforeAfterSlider 
  beforeImage="path/to/blur-image.jpg"
  afterImage="path/to/enhanced-image.jpg"
  beforeLabel="Blur"
  afterLabel="Clear"
/>
```

### ImageUpload
Drag-and-drop image upload with preview.

```jsx
import ImageUpload from "./components/ImageUpload";

<ImageUpload onUpload={handleImageUpload} />
```

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with auth middleware
- CORS configuration for allowed origins
- Environment variables for sensitive data


---

<div align="center">


</div>

