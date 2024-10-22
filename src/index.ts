import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Running");
});

const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log("User connected " + ++userCount);

  ws.send("Hello! Message from server!!");
});
