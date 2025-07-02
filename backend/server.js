const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routs/Taskroute.js");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Determine environment
const isProduction = process.env.NODE_ENV === 'production';

// ✅ Define allowed origins
const allowedOrigins = isProduction
  ? [
      'https://task-management-frontend-9nbxv94ue-abhisheks-projects-680a2fd9.vercel.app',
      'https://task-management-frontend.vercel.app', // fallback
    ]
  : ['http://localhost:5173'];

// ✅ Use CORS middleware with custom origin handling
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error('CORS blocked for origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/tasks", taskRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error("❌ MongoDB connection error:", err));
