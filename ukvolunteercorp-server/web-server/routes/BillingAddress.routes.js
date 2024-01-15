const router = require("express").Router();
const crypto = require("crypto");
const { db } = require("../db/db");
const adminAuth = require("../auth/adminAuth");
const auth = require("../auth/auth");

// Creaye Blling address for a particular order

router.post("/billing_address", auth, async (req, res) => {
  try {
    const billing_address = {
      _id: crypto.randomBytes(16).toString("hex"),
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      state: req.body.state,
      postalCode: req.body.postalCode,
      owner_id: req.user._id,
      createdAt: new Date().toISOString(),
    };

    let sql = `INSERT INTO billing_address SET ?`;
    db.query(sql, billing_address, (error) => {
      if (error) return console.log(error);
    });

    res.status(200).send({
      message: "Billing address created successfully",
      billing_address,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

//  Fetch all billing addresses
router.get("/billing_addresses", auth, async (req, res) => {
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

    let categories = await QUERY(
      `SELECT * FROM billing_address ORDER BY id DESC`
    );

    res.status(200).send(categories);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch single billing address
router.get("/billing_address/:_id", auth,  async (req, res) => {
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

    let [category] = await QUERY(
      `SELECT * FROM billing_address WHERE _id='${req.params._id}'`
    );
    if(!category){
      return res.status(400).send({
         message: "Not billing address found"
      })
    }

    console.log(category)

    res.status(200).send(category);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

//  Delete billing addrsss
router.delete("/billing_address/:_id", auth, async (req, res) => {
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

    let billing_address = await QUERY(
      `SELECT * FROM billing_address WHERE _id='${req.params._id}'`
    );
    if (billing_address.length < 1)
      return res.status(400).send({
        message: "Billing address not found",
      });

    db.query(
      `DELETE FROM billing_address WHERE _id='${req.params._id}'`,
      (error, result) => {
        if (error) {
          return console.log(error);
        }
      }
    );

    res.status(200).send({
      message: "Biillinf address deleted successfully",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
