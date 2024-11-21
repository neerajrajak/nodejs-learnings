const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  console.log("Inside admin Auth");
  const token = "admintokendd";
  const isAdmin = token === "admintoken";
  if (!isAdmin) res.status(401).send("User is not an admin");
  next();
};

const userAuth = async (req, res, next) => {
    try{
      // Read the token 
    const { token } = req.cookies;
    if(!token) throw new Error('Invalid Token...');
    const { _id } = await jwt.verify(token, 'mysecretkey');
    if(!_id) throw new Error('Not Authenticated');

    const user = await User.findById(_id);

    if(!user){
      throw new Error('User not found.');
    }
    req.user = user;
    next();
    } catch(error){
      res.status(400).send("Error in Auth: "+error.message);
    }
  };
  module.exports = {
    adminAuth, userAuth
  }