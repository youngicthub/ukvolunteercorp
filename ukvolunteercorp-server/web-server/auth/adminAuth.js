const jwt = require("jsonwebtoken");
const { db } = require("../db/db");

module.exports = function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null || token === "") return res.sendStatus(401);
  
  jwt.verify(token, process.env.ADMIN_JWT_SECRET, async (err, decode) => {
    if (err) {
      console.log( err, "Not logged in");
      return res.status(403).send({
         status: "error",
         message: "invalid token or not logged in"
      });
    }
    async function QUERY(val) {
      return new Promise((resolve, reject) => {
        let sql = val;
        db.query(sql, (error, result) => {
          if (error) {
            return console.log(error);
          }
          resolve(result);
        });
      });
    }

    req.user = decode;

    let user = await QUERY(`SELECT * FROM admin WHERE _id='${req.user._id}'`);
    if (user.length < 1) return res.status(403).json("User does not exist");

    next();
  });
};
