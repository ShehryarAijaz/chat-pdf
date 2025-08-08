import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";
import { queue } from "./middlewares/bullmq.middleware.js";
import { getVectorStore } from "./services/vectorStore.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.get("/test", (req, res) => {
  res.json({
    message: "All good",
    success: true,
  });
});

app.get("/talk", async (req, res) => {
  const userQuery = "Nociceptors";
  const vectorStore = await getVectorStore(true);
  const retriever = vectorStore.asRetriever({
    k: 2,
  });
  const result = await retriever.invoke(userQuery);

  if (result.length === 0) {
      console.log("No documents found for the query.");
      return res.json({
        message: "I couldn't find any relevant documents to answer your question.",
        docs: [],
        success: true
      });
    }

  console.log("Retrieved documents:", result.length);

  const SYSTEM_PROMPT = `You are a helpful assistant. Answer the question based on the context provided. If you don't know the answer, say "I don't know". Also, if you don't have the context provided to you, say "I don't have the context to answer this question". Don't respond from yourself but only from the context provided. If context is provided, say first "CONTEXT PROVIDED" and then answer the question.
  Context: ${JSON.stringify(result)}
  `;

  console.log("System prompt:", SYSTEM_PROMPT);

  const chatResult = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }, { text: userQuery }],
      }
    ]
  })

  return res.json({
    message: chatResult.candidates[0].content.parts[0].text,
    docs: result.length,
    success: true
  });
});

import uploadRoutes from "./routes/uploadFile.js";

app.use("/chat", uploadRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
