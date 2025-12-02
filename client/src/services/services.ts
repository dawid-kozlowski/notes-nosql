import axios from "axios";
import type { AxiosResponse } from "axios";

const baseURL = "http://localhost:3000";

export const saveCard = async (
  key: string,
  value: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${baseURL}/api/update`, { key, value });
    console.log("Card saved to database.");
    return response;
  } catch (err) {
    console.error("Failed to save text:", err);
    throw err;
  }
};

export const getCards = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/get`);
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const delCard = async (key: string): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/api/delete`, { params: { key } });
    console.log("Card deleted from database.");
  } catch (err) {
    console.error("Failed to delete card:", err);
    throw err;
  }
};

export const delCardAll = async () => {
  try {
    await axios.delete(`${baseURL}/api/delete-all`);
    console.log("All cards deleted.");
  } catch (err) {
    console.error("Failed to delete all cards:", err);
  }
};

export const getLibrary = async () => {
  try {
    const response = await axios.post(`${baseURL}/api/load-library`);
    console.log(response.data.message);
  } catch (err) {
    console.error(err);
  }
};

export const clearLibrary = async () => {
  try {
    const response = await axios.delete(`${baseURL}/api/clear-library`);
    console.log(response.data.message);
  } catch (err) {
    console.error(err);
  }
};

export const logLibraryData = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/library-data`);
    console.log("Library Data:", response.data.data);
  } catch (err) {
    console.error("Failed to fetch library data:", err);
  }
};

export const loadJsonCompany = async () => {
  try {
    const response = await axios.post(`${baseURL}/api/load-json`);
    console.log(response.data.message);
  } catch (err) {
    console.error(err);
  }
};

export const executeRedisJson = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/demo-json`);
    console.log("JSON commands results:", response.data.results);
  } catch (err) {
    console.error(err);
  }
};

export const clearJson = async () => {
  try {
    const response = await axios.delete(`${baseURL}/api/delete-json`);
    console.log(response.data.message);
  } catch (err) {
    console.error(err);
  }
};
