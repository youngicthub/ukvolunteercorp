const router = require("express").Router();
const crypto = require("crypto");
const { db } = require("../db/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const multer = require("multer");
const path = require("path");
const adminAuth = require("../auth/adminAuth");

const storage = multer.diskStorage({
  destination: "./web-server/web-folder/public/webStorage/receipts",
  filename: function (req, file, cb) {
    cb(null, "donations" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

// Create a donations
router.post("/donation", upload.single("upload"), async (req, res) => {
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

    if (!req.file) return res.status(401).send("Please upload receipt");

    const data = {
      _id: crypto.randomBytes(16).toString("hex"),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone_number: req.body.phone_number,
      email: req.body.email,
      message: req.body.message,
      createdAt: new Date().toISOString(),
      amount: req.body.amount,
      receipt: req.file.filename,
    };
    let sql = `INSERT INTO donations SET ?`;
    db.query(sql, data, (error) => {
      if (error) return console.log(error);
    });

    res.status(200).send({
      message: "donations created successfully",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch a donations by ID
router.get("/donation/:_id", async (req, res) => {
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

    let [donations] = await QUERY(
      `SELECT * FROM donations WHERE _id='${req.params._id}'`
    );
    console.log(donations);
    if (!donations) {
      return res.status(400).send({
        message: "No donations found",
      });
    }

    res.status(200).send(donations);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch all donations
router.get("/donations", async (req, res) => {
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

    let donations = await QUERY(`SELECT * FROM donations ORDER BY id DESC`);

    res.status(200).send(donations);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
