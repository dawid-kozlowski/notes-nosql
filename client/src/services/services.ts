import axios from "axios";

const baseURL = "http://localhost:3000";

export const saveText = async (key: string, value: string): Promise<void> => {
  try {
    await axios.post(`${baseURL}/api/update`, { key, value });
  } catch (err) {
    console.error("Failed to save text:", err);
  }
};

export const getKey = async (key: string) => {
  try {
    const response = await axios.get(`${baseURL}/api/get`, { params: { key } });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};
