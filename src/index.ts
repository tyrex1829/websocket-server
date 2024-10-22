import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((req: any, res: any) => {
  console.log(new Date() + " Recieved request for " + req.url);
  res.end("Hello");
});

const wss = new WebSocketServer({ server });

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

server.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});
