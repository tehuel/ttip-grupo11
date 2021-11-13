const expressJwt = require("express-jwt");
const config = require("../config.js");
// const userService = require("../services/user.service");

function jwt() {
  const secret = config.TOKEN_SECRET || "secret";
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    credentialsRequired: false,
  });
  //   .unless({
  //   path: [
  //     // public routes that don't require authentication
  //     "/users/authenticate",
  //     "/users/register",
  //     /\/users\/check_availability/i,
  //   ],
  // });
}

// async function isRevoked(req, payload, done) {
//   const user = await userService.getById(payload.sub);
//
//   // revoke token if user no longer exists
//   if (!user) {
//     return done(null, true);
//   }
//
//   done();
// }

module.exports = jwt;
