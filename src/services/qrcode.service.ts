import apiService from "./api.service";

export const generateQRCode = async () => {
  try {
    const response = await apiService.get("/generate-qr-code");
    return response.data;
  } catch (error) {
    throw error;
  }
};

