const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.database_user,
    database: process.env.database_name,
    password: process.env.database_password,
  });
  db.connect((error) => {
    if (error) {
      console.log(error);
    }
    console.log("SQL Connected");
  });
exports.db = db