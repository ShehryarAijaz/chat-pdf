import dotenv from "dotenv";
dotenv.config();
import { Worker } from "bullmq";
import { getVectorStore } from "./services/vectorStore.js";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";

const worker = new Worker(
  "process-pdf",
  async (job) => {
    console.log("Processing job:", job.data);
    const data = JSON.parse(job.data);
    // Path: data.path
    // Read the pdf from path
    // Chunk the pdf into smaller parts
    // Call the OpenAI API with the chunks
    // Store the chunk in qdrantDB

    // Load the PDF file
    const loader = new PDFLoader(data.filePath);
    const docs = await loader.load();
    const textSplitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunks = await textSplitter.splitDocuments(docs);
    console.log("Chunks created:", chunks);

    const { embeddings } = await getVectorStore();

    const vectorStore = await QdrantVectorStore.fromDocuments(chunks, embeddings, {
      url: process.env.QDRANT_URL || "http://localhost:6333",
      collectionName: "langchainjs-testing",
    });
    console.log("Vector store created:", vectorStore);
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