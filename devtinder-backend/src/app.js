const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const connectDB = require("./dbconfig");
const User = require("../src/models/user");
const { validateSignUpData } = require("./utils/validation");
const { userAuth } = require("../src/middleware/auth");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    // Validation of data
    validateSignUpData(req);

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // creating a new instance of a usermodel
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptedPassword,
    });
    await user.save();
    res.send(user);
    console.log("User Saved.");
  } catch (error) {
    console.log("An error occured: ", error);
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      res.status(401).send({
        authenticated: false,
        message: "Not a registered user",
      });
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      res.status(401).send({
        authenticated: false,
        message: "Invalid Credential",
      });
    } else {
      // create the token
      const token = await user.getJWT();

      console.log("token: ", token);
      
      // Add the token to cookie and send the response to the user
      let currentDate = new Date();
      res.cookie("token", token, {
        expires: new Date(Date.now()+ 8*10000), // expires cookie in 5 hours
      });
      res.send({
        authenticated: true,
        message: "You are a valid user.",
      });
    }
  } catch (error) {
    console.log("An error occured: ", error);
    res.status(500).send(error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).send("You are not authenticated");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
});

app.post("connectionRequest", userAuth, async (req, res) => {});

// app.get("/user", async (req, res) => {
//   const email = req.body.email;
//   try {
//     const user = await User.findOne({
//       emailId: email,
//     });
//     if (!user) {
//       res.status(404).send("User not found in the system.");
//     }
//     console.log("User found: ", user);
//     res.send(user);
//   } catch (err) {
//     res.status(500).send("Something went wrong: ", error);
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find();
//     if (!users.length) {
//       res.status(404).send("User not found in the system.");
//     }
//     console.log("User found: ", users);
//     res.send(users);
//   } catch (err) {
//     res.status(500).send("Something went wrong: ", error);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     console.log("Deleted: ", user);
//     if (user) {
//       res.send("User deleted.");
//     } else {
//       res.status(404).send("User not found to delete");
//     }
//   } catch (err) {
//     res.status(500).send("Something went wrong: ", error);
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   const ALLOWED_UPDATES = ["photoUrl", "about", "age", "skills", "gender"];
//   const isUpdateAllowed = Object.keys(data).every((k) =>
//     ALLOWED_UPDATES.includes(k)
//   );
//   console.log("isUpdateAllowed: ", data);
//   if (data?.skills?.length > 10) {
//     res.status(400).send(`Max 10 skills are allowed`);
//   }
//   if (!isUpdateAllowed) {
//     res
//       .status(400)
//       .send(`Only ${ALLOWED_UPDATES.join(",")} are allowed to update`);
//   }
//   try {
//     const user = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     console.log("Updated User: ", user);
//     if (user) {
//       res.send(user);
//     } else {
//       res.status(404).send("User not found to update");
//     }
//   } catch (err) {
//     res.status(500).send("UPDATE Failed: " + err.message);
//   }
// });

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
