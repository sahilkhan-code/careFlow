import express from "express";
import cors from "cors";
import app from "./app";
import { prisma } from "./utils/prisma";
import { connectReddis } from "./utils/redis";
import { createServer } from "http";
import { initializeSocket } from "./utils/socket";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app)

app.use(cors({
  origin: 'http://localhost:5173'
}))

const startServer = async () => {
  try {

    await prisma.$connect();
    try {
      await connectReddis();
      console.log("Redis connected successfully");
    } catch (error) {
      console.warn("Redis unavailable. Continuing without Redis.");
    }

    initializeSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`APP is UP at ${PORT}`)
    })

  } catch (e) {
    console.error("server connection failed", e);
    console.log(e)
    process.exit(1);
  }
}

startServer();

