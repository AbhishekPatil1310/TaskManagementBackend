const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routs/Taskroute.js");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed frontend domain (Vercel)
const allowedOrigins = ["https://task-management-frontend-rho-ruddy.vercel.app"];

// ✅ CORS middleware with specific origin
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ JSON body parser
app.use(express.json());

// ✅ API routes
app.use("/api/tasks", taskRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("MongoDB connection error:", err));
