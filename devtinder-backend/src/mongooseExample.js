const express = require("express");
const connectDB = require("./dbconfig");
const User = require("../src/models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // creating a new instance of a usermodel
  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
    console.log("User Saved.");
  } catch (error) {
    console.log("An error occured: ", error);

    res.status(500).send(error.message);
  }
});

app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({
      emailId: email,
    });
    if (!user) {
      res.status(404).send("User not found in the system.");
    }
    console.log("User found: ", user);
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong: ", error);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      res.status(404).send("User not found in the system.");
    }
    console.log("User found: ", users);
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong: ", error);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    console.log("Deleted: ", user);
    if (user) {
      res.send("User deleted.");
    } else {
      res.status(404).send("User not found to delete");
    }
  } catch (err) {
    res.status(500).send("Something went wrong: ", error);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  const ALLOWED_UPDATES = ["photoUrl", "about", "age", "skills"];
  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATES.includes(k)
  );
  console.log("isUpdateAllowed: ", data);
  if (data?.skills?.length > 10) {
    res.status(400).send(`Max 10 skills are allowed`);
  }
  if (!isUpdateAllowed) {
    res
      .status(400)
      .send(`Only ${ALLOWED_UPDATES.join(",")} are allowed to update`);
  }
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log("Updated User: ", user);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found to update");
    }
  } catch (err) {
    res.status(500).send("UPDATE Failed: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connection is succesfull");
    app.listen(5000, () => {
      console.log("Server is up and running at port 5000.");
    });
  })
  .catch((err) => {
    console.log("Connection failes: ", err);
  });
