const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { z, string } = require("zod");
const { GoogleGenerativeAI,DynamicRetrievalMode } = require("@google/generative-ai");
const cors = require("cors");
  
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: ["https://pgen-mail-client.vercel.app"]
};

app.use(cors(corsOptions));

// MongoDB Connection
mongoose
  .connect(process.env.MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  prompt: {
    type: String,
    required: true,
    trim: true,
  },
  send_time:{
    type:String,
    require:true,
    default:"8:00"
  },
  last_sent:{
    type:Date,
    default:null
  },
  active:{
    type:Boolean,
    default:true
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_success:{
    type:Date
  },
  error_count:{

  },
  last_attempt:{
    type:Date,
    default:null
  }
});

// User Model
const User = mongoose.model("User", userSchema);
app.get("/", async (req, res) => {
  res.send("Server Running");
});
// New User Endpoint
app.post("/add-user", async (req, res) => {
  try {
    const reqBody = z.object({
      email: z.string().min(3).max(100).email(),
      prompt: z.string().min(100).max(300),
      send_time: z.string()
    });
    const parsedData = reqBody.safeParse(req.body);

    if (!parsedData.success) {
      res.status(404).json({
        message: "Invalid Data",
        error: parsedData.error,
      });
      return;
    }
    const email = req.body.email;
    const prompt = req.body.prompt;
    const scheduleTime = req.body.send_time;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const newUser = new User({
      email,
      prompt,
      scheduleTime
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        email: newUser.email,
        prompt: newUser.prompt,
        send_time: newUser.send_time,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Start server

app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port} 🔥`)
);
