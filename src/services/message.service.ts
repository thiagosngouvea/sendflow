import apiService from "./api.service";

export const sendMessage = async (data: any) => {
  try {
    const response = await apiService.post("/send-message", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

