import axios from "axios";

const baseURL = "http://localhost:3000";

export const saveCard = async (key: string, value: string): Promise<void> => {
  try {
    await axios.post(`${baseURL}/api/update`, { key, value });
    console.log("Card saved to database.");
  } catch (err) {
    console.error("Failed to save text:", err);
  }
};

export const getCards = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/get`);
    console.log(response.status);
    return response.data.data || [];
  } catch (err) {
    console.error(err);
  }
};
