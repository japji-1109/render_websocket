const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Create HTTP server to serve the client interface and satisfy Render health checks
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('WebSocket server is active');
    }
});

// Attach WebSocket server to the HTTP server
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
    console.log('New Connection established!!');

    socket.on("message", (msg) => {
        const message = msg.toString();
        console.log(`Received message: ${message}`);

        if (message === 'hi') {
            socket.send("hello");
        } else if (message === "kaise ho") {
            socket.send('main theek hu.');
        } else {
            socket.send("errrr.....");
        }
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });
});

// Port assigned by Render or fallback to 4500 for local development
const PORT = process.env.PORT || 4500;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});
