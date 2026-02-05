import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import { imageService } from "../services/image";

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorType, setErrorType] = useState(null);
    const navigate = useNavigate();

    const fetchImages = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await imageService.getUserImages(1, 50);
            setImages(data.images || []);
        } catch (err) {
            console.error("Error fetching images:", err);
            setError(err.message || "Failed to load images");
            if (err.response?.status === 401) {
                setErrorType("auth_required");
            } else {
                setErrorType("general");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await imageService.deleteImage(id);
            setImages(images.filter(img => img._id !== id));
        } catch (err) {
            console.error("Error deleting image:", err);
            alert("Failed to delete image");
        }
    };

const handleEnhanceAgain = () => {
        window.location.href = "/dashboard";
    };

    const handleLogin = () => {
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <main className="pt-16 px-4 pb-12">
                    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-t-white border-gray-700 rounded-full animate-spin mb-4" />
                        <p className="text-gray-400">Loading your gallery...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (errorType === "auth_required") {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <main className="pt-16 px-4 pb-12">
                    <div className="max-w-7xl mx-auto text-center py-20">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Login Required</h3>
                        <p className="text-gray-400 mb-6">Please login to view your gallery</p>
                        <button
                            onClick={handleLogin}
                            className="btn-primary"
                            style={{ borderRadius: 0 }}
                        >
                            Go to Login
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <main className="pt-16 px-4 pb-12">
                    <div className="max-w-7xl mx-auto text-center py-20">
                        <p className="text-red-400">{error}</p>
                        <button
                            onClick={fetchImages}
                            className="mt-4 btn-primary"
                            style={{ borderRadius: 0 }}
                        >
                            Try Again
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <main className="pt-16 px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    {images.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No Images Yet</h3>
                            <p className="text-gray-400 mb-6">Start by enhancing some images in the Dashboard</p>
                            <a href="/dashboard" className="btn-primary" style={{ borderRadius: 0 }}>Go to Dashboard</a>
                        </div>
                    ) : (
                        <Gallery
                            images={images}
                            onDelete={handleDelete}
                            onEnhanceAgain={handleEnhanceAgain}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default GalleryPage;
