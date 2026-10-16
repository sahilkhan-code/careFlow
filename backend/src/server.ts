import express from "express";
import cors from "cors";
import app from "./app";
import { prisma } from "./utils/prisma";
import { connectReddis } from "./utils/redis";

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}))

const startServer = async () => {
  try {

    await prisma.$connect();
    await connectReddis();
    app.listen(PORT, () => {
      console.log(`APP is UP at ${PORT}`)
    })

  } catch (e) {
    console.error("Database connection failed", e);
    console.log(e)
    process.exit(1);
  }
}

startServer();

