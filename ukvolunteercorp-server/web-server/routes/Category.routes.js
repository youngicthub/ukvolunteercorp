const router = require("express").Router();
const crypto = require("crypto");
const { db } = require("../db/db");
const adminAuth = require("../auth/adminAuth")

// Create Category
router.post("/category", adminAuth, async (req, res) => {
  try {
    const data = {
      _id: crypto.randomBytes(16).toString("hex"),
      name: req.body.name,
      createdAt: new Date().toISOString(),
    };

    let sql = `INSERT INTO categories SET ?`;
    db.query(sql, data, (error) => {
      if (error) return console.log(error);
    });

    res.status(200).send({
      message: "Category created successfullu",
      category: data
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

//  Fetch all categories
router.get("/categories", async (req, res) => {
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

    let categories = await QUERY(`SELECT * FROM categories ORDER BY id DESC`);

    res.status(200).send(categories);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch single category
router.get("/category/:_id", async (req, res) => {
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
      `SELECT * FROM categories WHERE _id='${req.params._id}'`
    );

    if(!category) {
      return res.status(400).send({
         message: "No product found"
      })
   }

    res.status(200).send(category);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Delete category
router.delete("/category/:id", adminAuth, async (req, res) => {
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

    let categories = await QUERY(`SELECT * FROM categories WHERE _id='${req.params.id}'`);
    if(categories.length < 1) return res.status(400).send({
      message: "Category not found"
    })

    
    db.query(
      `DELETE FROM categories WHERE _id='${req.params.id}'`,
      (error, result) => {
        if (error) {
          return console.log(error);
        }
      }
    );

    res.status(200).send({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});
module.exports = router;