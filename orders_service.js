const express = require("express");
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

// const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;

// app.use(bodyParser.urlencoded({ extended: true }));
//app.use();
app.use(express.json());
app.use(cors());

let orders = [];

const clearOrders = () => {
  let orders = [];
};

app.get("/", (req, res) => {
  let output = "";
  orders.map((o) => {
    output +=
      "<div>" +
      "<p> The product with the id: " +
      o.productId +
      " has been ordered</p> " +
      "</div>";
  });

  res.end(`
      <h1>
        Current Orders
      </h1>
      <div id="output"></div>
      <button onClick=${clearOrders()}>
        Clear old orders
      </button>
      ${output}
      
  `);
});

app.post("/", (req, res) => {
  console.log(req.body);
  orders.push({ productId: req.body.id });
  res.json({ msg: "order Processed Successfully..." });
  console.log(orders);
  // res.end("new order");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
