const expressJwt = require("express-jwt");
const userService = require("../services/user.service");

// Vencimiento de token
process.env.TOKEN_TIMEOUT = "48h";

// SEED de autenticación
process.env.TOKEN = process.env.TOKEN || "Xxx333xxX";

module.exports = jwt;

function jwt() {
  const secret = process.env.TOKEN;
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
