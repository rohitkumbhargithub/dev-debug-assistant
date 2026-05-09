import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/debug",
});

export const analyzeError = (data) => API.post("/analyze-error", data);

export const searchErrors = (query) =>
    API.get(`/search?search=${query}`);

export const getHistory = (page = 1) =>
    API.get(`/history?page=${page}`);