import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";


import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import GalleryPage from "./pages/Gallery";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompressImage from "./components/CompressImage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
         
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

         
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowGuest={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compress"
            element={
              <ProtectedRoute allowGuest={true}>
                <CompressImage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute allowGuest={true}>
                <GalleryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

