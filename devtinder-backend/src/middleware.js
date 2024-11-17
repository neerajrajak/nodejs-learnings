const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

app.use("/middle", (req, res, next)=>{
    console.log("First callback.");
    next();
   res.send("hello middleware 1");
}, (req, res, next)=>{
    console.log("Second callback.");
    // res.send("hello middleware 2");
    // next();
})

// below example illustrate a middleware being used to autenticate admin user

app.use("/admin", adminAuth);

app.get("/admin/getAllData", userAuth ,(req, res)=>{
    res.send("All data sent.");
});

app.delete("/admin/deleteUSer", (req, res)=>{
    console.log("Inside delete user.");
    res.send("User is deleted.");
});


app.get("/user/getData", userAuth, (req, res)=>{
    res.send("User details sent");
});

/*
Above I have shown two ways to use middleware function according to our needs
In admin example I have added middleware auth in app.use method of /admin handler
since whenever a request comes to /admin handler app.use is the default one will be called first
and then it will validate the user using the middleware and call the method we called accordingly 
*/

/*
In user example i have passed the middleware in the argument of the method it is getting called.
this will help us to call optional auth scenarios
*/



app.listen(5000, () => {
  console.log("server is listening to 5000 port");
});
