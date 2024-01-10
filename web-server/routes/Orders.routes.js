const router = require("express").Router();
const crypto = require("crypto");
const { db } = require("../db/db");
const adminAuth = require("../auth/adminAuth");
const auth = require("../auth/auth");
const multer = require("multer");
const path = require("path");
const { OrderEmail } = require("../Email/Email");

const storage = multer.diskStorage({
  destination: "./web-server/web-folder/public/webStorage/receipt",
  filename: function (req, file, cb) {
    cb(null, "receipt" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

// Create Order with order ID
router.post("/orders", upload.single("upload"), auth, async (req, res) => {
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

    let [user] = await QUERY(`SELECT * FROM users WHERE _id='${req.user._id}'`);

    let products = JSON.parse(req.body.order);

    if (req.body.length < 1 || !products)
      return res.status(400).send({
        status: "error",
        message: "Order not found or cart is empty",
      });

    let order_id = crypto.randomBytes(4).toString("hex");

    products.map((item) => {
      const orders = {
        _id: crypto.randomBytes(4).toString("hex"),
        order_id: order_id,
        owner_id: req.user._id,
        brand_id: item.brand_id,
        category_id: item.category_id,
        name: item.name,
        description: item.description,
        status: "pending",
        image: item.image,
        price: item.price,
        qty: item.qty,
        receipt: req.file.filename,
        createdAt: new Date().toISOString(),
      };

      let sql = `INSERT INTO orders SET ?`;
      db.query(sql, orders, (error) => {
        if (error) return console.log(error);
      });
    });

    res.status(200).send({
      message: "Order created successfully",
      order_id: order_id,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Place order email
router.post("/place-order-email", auth, async (req, res) => {
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

    let [user] = await QUERY(`SELECT * FROM users WHERE _id='${req.user._id}'`);

    if (req.body.email === user.email) {

      console.log("single")
      OrderEmail({ email: user.email });

      return res.status(200).send({
        message: "Email sent",
      });
    } else {

      console.log("multiple")
      OrderEmail({ email: user.email });
      OrderEmail({ email: req.body.email });

      return res.status(200).send({
        message: "Email sent",
      });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// End point for order status
// @ Pending | Approved | Delivered
router.patch("/orders", adminAuth, async (req, res) => {
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

    let products = await QUERY(
      `SELECT * FROM orders WHERE order_id='${req.body.order_id}'`
    );

    if (products.length < 1)
      return res.status(404).send({
        status: "error",
        message: "Order not found",
      });

    db.query(
      `UPDATE orders SET status='${req.body.status}' WHERE order_id='${req.body.order_id}'`,
      (error) => {
        if (error) {
          return console.log(error);
        }
      }
    );

    res.status(200).send({
      message: "Order status was updated successfully",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch all user order
// router.get("/order/:_id", async (req, res) => {
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

//     let [category] = await QUERY(
//       `SELECT * FROM orders WHERE order_id='${req.params._id}'`
//     );

//     if (!category) {
//       return res.status(400).send({
//         message: "No product found",
//       });
//     }

//     res.status(200).send(category);
//   } catch (error) {
//     res.send(error);
//     console.log(error);
//   }
// });

// Fetch all user's order
router.get("/user_orders/:_id", auth, async (req, res) => {
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

    let orders = await QUERY(
      `SELECT * FROM orders WHERE owner_id='${req.params._id}' ORDER BY id DESC`
    );
    if (orders.length < 1) {
      return res.status(400).send({
        message: "No order found",
      });
    }

    let orderId = orders.map((cur) => {
      return {
        order_id: cur.order_id,
        createdAt: cur.createdAt,
      };
    });

    function removeDuplicates(array, key) {
      const seen = new Set();
      return array.filter((item) => {
        const value = key ? item[key] : JSON.stringify(item);
        return seen.has(value) ? false : seen.add(value);
      });
    }

    const uniqueArray = removeDuplicates(orderId, "order_id");

    res.status(200).send(uniqueArray);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

//  Get user order by ID
router.get("/user-order/", auth, async (req, res) => {
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

    let query_sql = `SELECT * FROM orders WHERE owner_id='${req.user._id}' ORDER BY id DESC`;

    let orders = await QUERY(query_sql);

    if (orders.length < 1) {
      return res.status(400).send({
        message: "No order found",
      });
    }

    const orderWithUserFunction = async () => {
      let orderArray = await QUERY(query_sql);

      let mergedOrderWithUsers = orderArray.map(async (item) => {
        const [user] = await QUERY(
          `SELECT * FROM users WHERE _id='${item.owner_id}'`
        );

        if(!user) return
        item.user = user;

        item.brand_id = undefined;
        item.category_id = undefined;
        item.name = undefined;
        item.description = undefined;
      });

      await Promise.all(mergedOrderWithUsers);
      return orderArray;
    };

    const orderWithUsers = await orderWithUserFunction();

    function removeDuplicates(array, key) {
      const seen = new Set();
      return array.filter((item) => {
        const value = key ? item[key] : JSON.stringify(item);
        return seen.has(value) ? false : seen.add(value);
      });
    }

    const uniqueArray = removeDuplicates(orderWithUsers, "order_id");

    res.status(200).send(uniqueArray);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

//  Fetch order lists or normal user
router.get("/admin-order/:_id", auth, async (req, res) => {
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

    let orders = await QUERY(
      `SELECT * FROM orders WHERE order_id='${req.params._id}' ORDER BY id DESC`
    );
    if (orders.length < 1) {
      return res.status(400).send({
        message: "No order found",
      });
    }

    res.status(200).send(orders);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch order list for admin

router.get("/admin-order-list/:_id", adminAuth, async (req, res) => {
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

    let orders = await QUERY(
      `SELECT * FROM orders WHERE order_id='${req.params._id}' ORDER BY id DESC`
    );
    if (orders.length < 1) {
      return res.status(400).send({
        message: "No order found",
      });
    }

    res.status(200).send(orders);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Admin fetch Order By status
router.get("/order_by_status", adminAuth, async (req, res) => {
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

    let query_sql = `SELECT * FROM orders WHERE status='${req.query.status}' ORDER BY id DESC`;
    if (req.query.status === "" || !req.query.status) {
      query_sql = `SELECT * FROM orders ORDER BY id DESC`;
    }

    let orders = await QUERY(query_sql);

    if (orders.length < 1) {
      return res.status(400).send({
        message: "No order found",
      });
    }

    const orderWithUserFunction = async () => {
      let orderArray = await QUERY(query_sql);

      let mergedOrderWithUsers = orderArray.map(async (item) => {
        const [user] = await QUERY(
          `SELECT * FROM users WHERE _id='${item.owner_id}'`
        );

        if(!user) return
        item.user = user;

        item.brand_id = undefined;
        item.category_id = undefined;
        item.name = undefined;
        item.description = undefined;
      });

      await Promise.all(mergedOrderWithUsers);
      return orderArray;
    };

    const orderWithUsers = await orderWithUserFunction();

    function removeDuplicates(array, key) {
      const seen = new Set();
      return array.filter((item) => {
        const value = key ? item[key] : JSON.stringify(item);
        return seen.has(value) ? false : seen.add(value);
      });
    }

    const uniqueArray = removeDuplicates(orderWithUsers, "order_id");

    res.status(200).send(uniqueArray);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Delete a  product
router.delete("/order_delete/:id", adminAuth, async (req, res) => {
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

    let orders = await QUERY(
      `SELECT * FROM orders WHERE order_id='${req.params.id}'`
    );
    console.log(orders);

    if (orders.length < 1)
      return res.status(400).send({
        message: "Order does not exist",
      });

    db.query(
      `DELETE FROM orders WHERE order_id='${req.params.id}'`,
      (error, result) => {
        if (error) {
          return console.log(error);
        }
      }
    );

    res.status(200).send({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});
module.exports = router;
