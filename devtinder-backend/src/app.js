const express = require("express");

const app = express();

app.get("/hello",(req, res)=>{
    console.log(req.query);
    
    res.send("Hello from dev tinder server.");
});

app.post("/hello/:userId", (req, res)=>{
    console.log(req.params);
    
    res.send("Hello from post method")
})

app.use("/test",(req, res)=>{
    res.send("What are you testing?");
});



app.use("/",(req, res)=>{
    res.send("Home Route.");
});

app.listen(5000, ()=> {
    console.log("server is listening to 5000 port");
    
});