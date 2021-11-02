const expressJwt = require("express-jwt");
const userService = require("../services/user.service");
const config = require("../config.js");

function jwt() {
  const secret = config.TOKEN_SECRET;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
      "/users/register",
      /\/users\/check_availability/i,
      "/shops/",
      /\/shops/i,
      "/products/",
      /\/products\/shop/i,
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}

module.exports = jwt;
