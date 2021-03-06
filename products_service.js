const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());
const data = [
  { id: 0, name: "Product 1", description: "This is product 1", price: 20 },
  { id: 1, name: "Product 2", description: "This is product 2", price: 10 },
  { id: 2, name: "Product 3", description: "This is product 3", price: 30 },
  { id: 3, name: "Product 4", description: "This is product 4", price: 50 },
];
app.get("/", (req, res) => {
  res.json({ data });
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
