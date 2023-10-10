const userDb = require("../models/test-auth");

function addUserToLocals(req, res, next) {
  console.log("called?");
  const authToken = req.cookies["authToken"];
  res.locals.user = userDb.getUserWithAuthToken(authToken);
  next();
}

function verifyAuthenticated(req, res, next) {
  console.log(res.locals.user);
  if (res.locals.user) {
    next();
  }
  else {
    res.redirect("/login");
  }
}

module.exports = {
  verifyAuthenticated,
  addUserToLocals,
};
