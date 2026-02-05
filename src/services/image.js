import api from "./api";

export const imageService = {

  getEnhancementTypes: async () => {
    const { data } = await api.get("/images/types");
    return data;
  },


  getUserImages: async (page = 1, limit = 10, type = null) => {
    const params = { page, limit };
    if (type) params.type = type;
    const { data } = await api.get("/images", { params });
    return data;
  },


  getImage: async (id) => {
    const { data } = await api.get(`/images/${id}`);
    return data;
  },


  enhanceImage: async (file, enhancementType = "general", scaleFactor = 2) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("enhancementType", enhancementType);
    formData.append("scaleFactor", scaleFactor);

    const { data } = await api.post("/images/enhance", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },


  saveEnhancedImage: async (originalImage, enhancedImage, enhancementType = "general", originalName = "enhanced-image.jpg", fileSize = 0) => {
    const { data } = await api.post("/images/save-enhanced", {
      originalImage,
      enhancedImage,
      enhancementType,
      originalName,
      fileSize,
    });
    return data;
  },


  deleteImage: async (id) => {
    const { data } = await api.delete(`/images/${id}`);
    return data;
  },
};

