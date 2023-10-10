const userDb = require("../models/test-auth-dao");

async function addUserToLocals(req, res, next) {
  const authToken = req.cookies["authToken"];
  res.locals.user = await userDb.getUserWithAuthToken(authToken);
  next();
}

function verifyAuthenticated(req, res, next) {
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
