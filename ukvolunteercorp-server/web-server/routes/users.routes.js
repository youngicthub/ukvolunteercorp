const router = require("express").Router();
const crypto = require("crypto");
const { db } = require("../db/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth")
const multer = require("multer");
const path = require("path");
const adminAuth = require("../auth/adminAuth");
const {WelcomeEmail} = require("../Email/Email");
const nodemailer = require("nodemailer");
const fs = require("fs");


const storage = multer.diskStorage({
  destination: "./web-server/web-folder/public/webStorage/avatar",
  filename: function (req, file, cb) {
    cb(null, "avatar" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});



// Create account`
router.post("/signup", async (req, res) => {
  try {
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

    const user = await QUERY(
      `SELECT * FROM users WHERE email='${req.body.email}'`
    );

    if (user.length > 0)
      return res.status(409).send({
        message: "User with this email address already exists.",
        hint: "You can try logging in with your existing account or using a different email address.",
      });

      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const userData = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: hashedPassword,
      _id: crypto.randomBytes(16).toString("hex"),
      createdAt: new Date().toISOString()
    };

    let sql = `INSERT INTO users SET ?`;
    db.query(sql, userData, (error) => {
      if (error) return console.log(error);
    });

    //  Assigning JWT token
    const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET);

    WelcomeEmail(userData)


    res.status(200).send({
      message: "user created successfully",
      user: { ...userData, token },
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

//  Login
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
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

    let user = await QUERY(
      `SELECT * FROM users WHERE email='${req.body.email.toLowerCase()}'`
    );

    if (user.length < 1)
      return res.status(404).send({ message: "User does not exist" });

    user = user[0];

    if (user.is_verified === "false")
      return res.status(403).send({
        message: "Account not verified, please navigate to verification page",
        verification: false,
      });

    // CHeck password
    const isPassword = await bcryptjs.compare(req.body.password, user.password);
    if (!isPassword) {
      return res.status(401).send({
        message: "Invalid username or password",
      });
    }

    //  Assigning JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).send({
      message: "Login successful",
      user: { ...user, token },
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Get user
router.get("/user", auth, async (req, res) => {
  try {
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

    let user = await QUERY(`SELECT * FROM users WHERE _id='${req.user._id}'`);

    if (user.length < 1)
      return res.status(404).send({ message: "User does not exist" });

    user = user[0];

    res.status(200).send(user);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.get("/user/:_id", auth, async (req, res) => {
  try {
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

    let user = await QUERY(`SELECT * FROM users WHERE _id='${req.params._id}'`);

    if (user.length < 1)
      return res.status(404).send({ message: "User does not exist" });

    user = user[0];

    res.status(200).send(user);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch all  users
router.get("/users", adminAuth, async (req, res) => {
  try {
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

    let user = await QUERY(`SELECT * FROM users ORDER BY id DESC`);

    res.status(200).send(user);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});



// UPDATE ACCOUNT INFO

router.patch("/account-update", auth, async (req, res) => {
  try {
    // Compare code
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

    let [user] = await QUERY(
      `SELECT * FROM users WHERE _id='${req.user._id}'`
    );

    console.log(req.body)

    const hashedPassword = await bcryptjs.hash(req.body.newPassword, 10);

    const isPassword = await bcryptjs.compare(req.body.password, user.password);

    if(!isPassword)  return res.status(403).send({
      message: "Old password is incorrect"
    })

    

    if(req.body.fullName === "")  req.body.fullName = user.fullName

    db.query(
      `UPDATE users SET fullName='${req.body.fullName}', password='${hashedPassword}' WHERE _id='${req.user._id}'`,
      (error) => {
        if (error) {
          return console.log(error);
        }
      }
    );
    //  Assigning JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({
      message: "Account Updated successfully ",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});




// Reset password via email
const passwordResetTokens = {};


router.post("/forgot-password",  async (req, res) => {
  try {
    // Compare code
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

    let [user] = await QUERY(
      `SELECT * FROM users WHERE email='${req.body.email}'`
    );
console.log(req.body)
    if(!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const token = crypto.randomBytes(32).toString('hex');

    passwordResetTokens[user.id] = token;


    let resetLink = `https://www.covimeds.org/resetpassword?token=${token}`;


    let transporter = nodemailer.createTransport({
      host: "mail.assetbloomaxis.com",
      name: "assetbloomaxis.com",
      pool: true,
      port: 587, //<----change
      secure: false,
      auth: {
        user: "covimeds.support.team@binarytradingoptions.org", // generated ethereal user
        pass: "zSnD74R9rMQH", // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    let mailOptions = {
      from: '"Covimeds" <covimeds.support.team@binarytradingoptions.org>', // sender address
      to: user.email, // list of receivers
      subject: `Password Reset Request`, // Subject line
      // text: "Hello world?", // plain text body
      text: `Click the following link to reset your password: ${resetLink}`,
  
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      console.log("Email has been sent");
  
    });

    

    res.status(200).send({
      message: "Reset email sent successfully ",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});





// Route to handle password reset
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  // Validate the token
  const userId = Object.keys(passwordResetTokens).find(
    (id) => passwordResetTokens[id] === token
  );



  if (!userId) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
  const hashedPassword = await bcryptjs.hash(req.body.newPassword, 10);

  console.log(userId)

  db.query(
    `UPDATE users SET password='${hashedPassword}' WHERE id='${userId}'`,
    (error) => {
      if (error) {
        return console.log(error);
      }
    }
  );

  // Remove the used token
  delete passwordResetTokens[userId];

  res.json({ message: 'Password reset successful' });
});




// // GENERARE CODE
// router.post("/generate-confirmation-code/", async (req, res) => {
//   try {
//     const code = Math.random().toString().substr(2, 4);
//     db.query(
//       `UPDATE users SET verification_code='${code.toString()}' WHERE email='${
//         req.body.email
//       }'`,
//       (error) => {
//         if (error) {
//           return console.log(error);
//         }
//       }
//     );

//     if (req.body.emailType == "verify-email")
//       VerifyAccount({ email: req.body.email, code }); // Send email

//     if (req.body.emailType == "forgot-password")
//       ForgotPasswordEmail({ email: req.body.email, code }); // Send email

//     res.status(200).send({
//       message: "Code Sent",
//     });
//   } catch (error) {
//     res.send(error);
//     console.log(error);
//   }
// });

// Verify / Check Code
router.post("/acccount-verification-verify-code", async (req, res) => {
  try {
    // Compare code
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

    let user = await QUERY(
      `SELECT * FROM users WHERE email='${req.body.email}'`
    );
    user = user[0];

    if (user.verification_code !== req.body.code || req.body.code === "") {
      return res.status(401).send({
        message: "Invalid code",
      });
    }

    db.query(
      `UPDATE users SET verification_code='', is_verified='true' WHERE email='${req.body.email}'`,
      (error) => {
        if (error) {
          return console.log(error);
        }
      }
    );
    //  Assigning JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({
      message: "Account verified ",
      user: { ...user, token },
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// // Forgot password
// router.post("/reset-password-compare-verification-code", async (req, res) => {
//   try {
//     async function QUERY(val) {
//       return new Promise((resolve, reject) => {
//         let sql = val;
//         db.query(sql, (error, result) => {
//           if (error) {
//             return console.log(error);
//           }
//           resolve(result);
//         });
//       });
//     }

//     let user = await QUERY(
//       `SELECT * FROM users WHERE email='${req.body.email}'`
//     );
//     user = user[0];

//     if (user.verification_code !== req.body.code) {
//       return res.status(401).send({
//         message: "Invalid code",
//       });
//     }

//     res.status(200).send({
//       message: "Valid code ",
//     });
//   } catch (error) {
//     res.send(error);
//     console.log(error);
//   }
// });

// // @ Update forgotten password
// router.post("/reset-forgotten-password", async (req, res) => {
//   try {
//     async function QUERY(val) {
//       return new Promise((resolve, reject) => {
//         let sql = val;
//         db.query(sql, (error, result) => {
//           if (error) {
//             return console.log(error);
//           }
//           resolve(result);
//         });
//       });
//     }

//     let user = await QUERY(
//       `SELECT * FROM users WHERE email='${req.body.email}'`
//     );
//     user = user[0];

//     if (user.verification_code !== req.body.code) {
//       return res.status(401).send({
//         message: "Invalid code or you are not authorized",
//       });
//     }

//     if (req.body.password !== req.body.confirmPassword)
//       return res.status(401).send({
//         message: "Password did not match",
//       });

//     const password = await bcryptjs.hash(req.body.password, 10);

//     db.query(
//       `UPDATE users SET verification_code='', password='${password}' WHERE email='${req.body.email}'`,
//       (error) => {
//         if (error) {
//           return console.log(error);
//         }
//       }
//     );
//     //  Assigning JWT token
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//     res.status(200).send({
//       message: "Password changed",
//       user,
//       token,
//     });
//   } catch (error) {
//     res.send(error);
//     console.log(error);
//   }
// });

// Search users

router.post("/users-search", auth, async (req, res) => {
  try {
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

    let users = await QUERY(`SELECT * FROM users`);

    if (req.body.query.length < 1) return res.send([]);

    users.map((item) => {
      item.fullname = item.firstname + " " + item.lastname;
      return item;
    });

    let filerednames = users.filter((item) => {
      let fullname = item.fullname.toLowerCase();
      return fullname.includes(req.body.query.toLowerCase());
    });

    return res.send(filerednames);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});



// Delete a  users
router.delete("/user/:id", adminAuth,async (req, res) => {
  try {

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

      let users = await QUERY(`SELECT * FROM users WHERE _id='${req.params.id}'`);

      if(users.length < 1) return res.status(400).send({
        message: "User does not exist"
      })


      db.query(
        `DELETE FROM users WHERE _id='${req.params.id}'`,
        (error, result) => {
          if (error) {
            return console.log(error);
          }
        }
      );

    res.status(200).send({
     message: "User deleted successfully"
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// UPDATE Avatar
router.post(
  "/update-avatar",
  upload.single("upload"),
  auth,
  async (req, res) => {
    try {
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

      let user = await QUERY(`SELECT * FROM users WHERE _id='${req.user._id}'`);

      user = user[0];

      if (!req.file)
        return res.status(401).send({
          message: "Please insert an image",
        });

      db.query(
        `UPDATE users SET avatar='${req.file.filename}' WHERE _id='${user._id}'`,
        (error) => {
          if (error) {
            return console.log(error);
          }
        }
      );

      res.status(200).send({
        message: "Avatar updated successfully.",
      });
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  }
);

module.exports = router;
