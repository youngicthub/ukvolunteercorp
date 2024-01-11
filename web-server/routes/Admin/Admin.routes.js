const router = require("express").Router();
const crypto = require("crypto");
const { db } = require("../../db/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const adminAuth = require("../../auth/adminAuth");


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

    if(req.body.secret !== process.env.SECRET_KEY) return res.status(403).send({
      message: "You don't have access to this page"
    })

    const user = await QUERY(
      `SELECT * FROM admin WHERE email='${req.body.email}'`
    );

    if (user.length > 0)
      return res.status(409).send({
        message: "Admin with this email address already exists.",
        hint: "You can try logging in with your existing account or using a different email address.",
      });

    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const userData = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: hashedPassword,
      _id: crypto.randomBytes(16).toString("hex"),
      createdAt: new Date().toISOString(),
    };

    let sql = `INSERT INTO admin SET ?`;
    db.query(sql, userData, (error) => {
      if (error) return console.log(error);
    });

    //  Assigning JWT token
    const token = jwt.sign({ _id: userData._id }, process.env.ADMIN_JWT_SECRET);

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
      `SELECT * FROM admin WHERE email='${req.body.email.toLowerCase()}'`
    );

    console.log(user)

    if (user.length < 1)
      return res.status(404).send({ message: "Admin does not exist" });

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
    const token = jwt.sign({ _id: user._id }, process.env.ADMIN_JWT_SECRET);

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
router.get("/user", adminAuth, async (req, res) => {
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

    let user = await QUERY(`SELECT * FROM admin WHERE _id='${req.user._id}'`);

    if (user.length < 1)
      return res.status(404).send({ message: "Admin does not exist" });

    user = user[0];

    res.status(200).send({
      message: "Fetched user",
      data: user,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.get("/user/:_id", adminAuth, async (req, res) => {
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

    let user = await QUERY(`SELECT * FROM admin WHERE _id='${req.params._id}'`);

    if (user.length < 1)
      return res.status(404).send({ message: "Admin does not exist" });

    user = user[0];

    res.status(200).send({
      message: "Fetched user",
      data: user,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch admin details
router.get("/", adminAuth, async (req, res) => {
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

    let [user] = await QUERY(`SELECT * FROM admin WHERE _id='${req.user._id}'`);

    res.status(200).send(user);
    console.log("Run test")
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch all  admin
router.get("/admin", adminAuth, async (req, res) => {
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

    let user = await QUERY(`SELECT * FROM admin ORDER BY id DESC`);

    res.status(200).send(user);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});
// Delete donation 

router.delete("/donation/:id", adminAuth, async (req, res) => {
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

    let donations = await QUERY(`SELECT * FROM donations WHERE _id='${req.params.id}'`);

    if (donations.length < 1)
      return res.status(400).send({
        message: "Donation does not exist",
      });

    db.query(
      `DELETE FROM donations WHERE _id='${req.params.id}'`,
      (error, result) => {
        if (error) {
          return console.log(error);
        }
      }
    );

    res.status(200).send({
      message: "Donations deleted successfully",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Delete  admin
router.delete("/delete/:id", adminAuth, async (req, res) => {
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

    let admin = await QUERY(`SELECT * FROM admin WHERE _id='${req.params.id}'`);

    if (admin.length < 1)
      return res.status(400).send({
        message: "User does not exist",
      });

    db.query(
      `DELETE FROM admin WHERE _id='${req.params.id}'`,
      (error, result) => {
        if (error) {
          return console.log(error);
        }
      }
    );

    res.status(200).send({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
