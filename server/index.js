import express from "express";
import cors from "cors";
import { queue } from "./middlewares/bullmq.middleware.js";
import { getVectorStore } from "./services/vectorStore.js";

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

  const SYSTEM_PROMPT = `You are a helpful assistant. Answer the question based on the context provided. If you don't know the answer, say "I don't know".
  Context: ${result.map((doc) => doc.pageContent).join("\n")}
  `;

  return res.json({ result });
});

import uploadRoutes from "./routes/uploadFile.js";

app.use("/chat", uploadRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
