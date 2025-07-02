const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routs/Taskroute.js");

const app = express();
const PORT = process.env.PORT || 5000;

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction
  ? [
      'https://task-management-frontend-9nbxv94ue-abhisheks-projects-680a2fd9.vercel.app',
      'https://task-management-frontend-9nbxv94ue-abhisheks-projects-680a2fd9.vercel.app',
    ]
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ JSON body parser
app.use(express.json());

// ✅ API routes
app.use("/api/tasks", taskRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("MongoDB connection error:", err));
