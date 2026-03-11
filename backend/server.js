import express from "express";
import config from "./config/config.js";
import connectDB from "./config/mongodb.config.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import mentorRoutes from "./routes/mentor.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import { OpenAI } from "openai/client.js";
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = config.port || 3000;

const openai = new OpenAI({
  apiKey: config.OpenAI_API_KEY
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    error: "Too many requests. Please try again later."
  }
});

app.use("/auth", authRoutes);
app.use("/parent", parentRoutes);
app.use("/mentor", mentorRoutes);
app.use('/llm/summarize',limiter)
app.post("/llm/summarize", async (req, res) => {
  const { text } = req.body;
  try {
    if (!text || text.trim().length == 0) {
      return res.status(400).json({ error: "Text is empty" });
    } else if (text.length < 50) {
      return res.status(400).json({ error: "Text must be at least 50 character" });
    } else if (text.length > 12000) {
      return res.status(413).json({ error: "Text is to large for processing." });
    }


    const response = await openai.responses.create({
              model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: "You are a helpful assistant and always return a concise summary of the input."
      },
      {
        role: "user",
        content: text
      }
    ]
  });
   
  const summary = response.output[0].content[0].text;
   console.log(summary);

    res.json({
      answer:summary
    });
  } catch (error) {
    return res.status(502).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello,Your server is running" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
