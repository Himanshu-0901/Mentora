import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/mentora",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  Node_ENV: process.env.NODE_ENV || "development",
  OpenAI_API_KEY:process.env.OPENAI_API_KEY
};

export default config;
