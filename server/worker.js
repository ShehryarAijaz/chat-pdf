import dotenv from "dotenv";
dotenv.config();
import { Worker } from "bullmq";
import { getVectorStore } from "./services/vectorStore.js";
import { QdrantVectorStore } from "@langchain/qdrant";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";

console.log("Worker started");

const worker = new Worker(
  "process-pdf",
  async (job) => {
    try {
      console.log("Processing job:", job.data);
      const data = typeof job.data === "string" ? JSON.parse(job.data) : job.data;

      // Load the PDF file
      const loader = new PDFLoader(data.filePath);
      const docs = await loader.load();
      const textSplitter = new CharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      const chunks = await textSplitter.splitDocuments(docs);
      console.log("Chunks created:", chunks.length);

      // Get embeddings instance
      const { embeddings } = await getVectorStore();

      // Store chunks in Qdrant
      const vectorStore = await QdrantVectorStore.fromDocuments(
        chunks,
        embeddings,
        {
          url: process.env.QDRANT_URL || "http://localhost:6333",
          collectionName: "langchainjs-testing",
        }
      );
      console.log("Vector store created:", Boolean(vectorStore));
    } catch (error) {
      console.error("Error processing job:", error);
      throw error;
    }
  },
  {
    concurrency: 5,
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

export { worker };