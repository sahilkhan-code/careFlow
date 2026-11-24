import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initializeSocket = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("client:message", (message: string) => {
            console.log("Message received from client:", message);

            socket.emit("server:message", {
                message: `Server received: ${message}`,
                receivedAt: new Date().toISOString(),
            });
        });

        socket.on("disconnect", (reason) => {
            console.log(`Socket disconnected: ${socket.id}`, reason);
        });
    });

    console.log("Socket.IO initialized");

    return io;
};

export const getIO = (): Server => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized");
    }

    return io;
};