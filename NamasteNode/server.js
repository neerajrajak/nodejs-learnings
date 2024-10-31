const http = require("http");

const server = http.createServer((req, res)=>{

    if(req.url?.includes("getSecretData")){
        res.end("There is no secret data.");
    }
    res.end("Hello World.");
});

server.listen(7777);