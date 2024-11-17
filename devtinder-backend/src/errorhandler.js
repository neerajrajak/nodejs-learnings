const express = require("express");
const app = express();

app.get("/checkError", (req, res) => {
  try {
    throw new Error("My Custom Error.");
    res.send("Have I reached?");
  } catch (err) {
    console.log("I am an error from checError route being handled");
    res.status(500).send("Error occured now what you gona do?");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    console.log("I am called when there is an error in any route and error is not handled properly");
    res.status(500).send("Something went wrong, please contact support");
  }
  console.log("I am a default route called at end for no matching route.");
});

app.listen(5000, () => {
  console.log("server is listening to 5000 port");
});
