import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

// Login API
export const loginAdmin = (data) => API.post("/admin/login", data);