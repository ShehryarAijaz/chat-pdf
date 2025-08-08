
# Chat PDF

A simple hobby project to upload PDF files, process them with OpenAI and store vector embeddings in QdrantDB. Built with Next.js (frontend), Node.js/Express (backend), BullMQ for job processing, and LangChain for PDF chunking.

## Features
- Upload PDF files
- Process and chunk PDFs
- Store and search embeddings

## Getting Started

### 1. Start backend services (Redis & Qdrant) with Docker
```bash
docker compose up -d
```

### 2. Start the backend server
```bash
cd server
npm install
npm run dev
# (in another terminal, for worker)
npm run dev:worker
```

### 3. Start the frontend (Next.js)
```bash
cd client
npm install
npm run dev
```

---
For fun and learning.