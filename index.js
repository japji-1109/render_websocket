const WebSocket = require('ws');
const wss = new WebSocket.Server({port:4500});

wss.on("connection", (socket) => {
    console.log('New Connection estabilished!!');
    socket.on("message", (msg) => {
        const message = msg.toString();
        // socket.send("Hello from server.")
        if(message == 'hi'){
            socket.send("hello");
        }
        else if(message == "kaise ho"){
            socket.send('main theek hu.');
        }else{
            socket.send("errrr.....")
        }
    });
});

