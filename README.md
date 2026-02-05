Pixora - Image Enhancement Platform

<div align="center">



**Transform Your Images with Neural Magic**

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
- **Fast Processing** - Get results in seconds

---

##  Project Structure

```
image-enhancer/
├──  public/                
├──  src/                   
│   ├──  components/         
│   │   ├── AuthForm.jsx     
│   │   ├── BeforeAfterSlider.jsx  
│   │   ├── Features.jsx      
│   │   ├── Gallery.jsx       
│   │   ├── Hero.jsx           
│   │   ├── ImagePreview.jsx   
│   │   ├── ImageUpload.jsx    
│   │   ├── Loading.jsx        
│   │   └── Navbar.jsx         
│   ├──  context/            
│   │   └── AuthContext.jsx    
│   ├──  pages/              
│   │   ├── Dashboard.jsx      
│   │   ├── Gallery.jsx      
│   │   ├── Landing.jsx      
│   │   ├── Login.jsx         
│   │   └── Signup.jsx        
│   ├── routes/             
│   │   └── ProtectedRoute.jsx 
│   ├──  services/           
│   │   ├── api.js            
│   │   └── image.js          
│   ├──  utils/              
│   │   └── enhanceImageApi.js 
│   ├── App.jsx               
│   └── main.jsx              
├── backend/                
│   ├──  config/             
│   │   └── db.js             
│   ├──  controllers/        
│   │   ├── authController.js 
│   │   └── imageController.js 
│   ├──  middleware/        
│   │   └── auth.js           
│   ├──  models/             
│   │   ├── Image.js         
│   │   └── User.js           
│   ├──  routes/             
│   │   ├── authRoutes.js     
│   │   └── imageRoutes.js    
│   ├──  utils/              
│   │   └── enhanceImageApi.js 
│   └── server.js              
├──  .env.example            
├──  .gitignore             
├──  eslint.config.js      
├──  package.json           
├──  vite.config.js         
└──  README.md            

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

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with auth middleware
- CORS configuration for allowed origins
- Environment variables for sensitive data


---

<div align="center">


</div>

