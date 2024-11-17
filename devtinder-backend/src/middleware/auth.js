const adminAuth = (req, res, next) => {
  console.log("Inside admin Auth");
  const token = "admintokendd";
  const isAdmin = token === "admintoken";
  if (!isAdmin) res.status(401).send("User is not an admin");
  next();
};

const userAuth = (req, res, next) => {
    console.log("Inside User Auth");
    const token = "usertoken";
    const isAdmin = token === "usertoken";
    if (!isAdmin) res.status(401).send("User is not an admin");
    next();
  };
  module.exports = {
    adminAuth, userAuth
  }