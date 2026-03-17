const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./Routes/adminRoutes");
const blogRoutes = require("./Routes/blogRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads",express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/komstruk")
.then(()=>console.log("MongoDB Connected"));

app.use("/api/admin",adminRoutes);
app.use("/api/blog",blogRoutes);

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});





