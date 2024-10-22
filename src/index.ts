import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((req: any, res: any) => {
  console.log(new Date() + " Recieved request for " + req.url);
  res.end("Hello");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Hello! Message from server!!");
});
