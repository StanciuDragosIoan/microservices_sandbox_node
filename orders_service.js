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

app.get("/deleteAll", (req, res) => {
  orders = [];
  res.end("orders deleted");
});

app.get("/", (req, res) => {
  let output = "";
  orders.map((o) => {
    output +=
      "<div>" +
      "<p> The product with the id: " +
      o.productId +
      " has been ordered</p> " +
      "<p>The product price is: " +
      o.price +
      "</p>" +
      "</div>" +
      "<hr style='width:30vw; margin-left:0;'>";
  });

  // console.log(orders);
  res.end(`
      <h1>
        Current Orders
      </h1>
      <div id="output"></div>
      <button id='orderBtn'>
        Clear old orders
      </button>
      <script>
      document.querySelector("#orderBtn").addEventListener('click',() => {
        window.location.href = 'http://localhost:8000/deleteAll';
      });
      </script>
      ${output}
      
  `);
});

app.post("/", (req, res) => {
  console.log(req.body);
  orders.push({ productId: req.body.id, price: req.body.price });
  res.json({ msg: "order Processed Successfully..." });
  console.log(orders);
  // res.end("new order");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
