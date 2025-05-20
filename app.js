const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const products = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Phone", price: 300 },
  { id: 3, name: "Headphones", price: 100 }
];

let cart = [];

app.get("/", (req, res) => {
  res.render("index", { products: products });
});

app.post("/add-to-cart", (req, res) => {
  const productId = parseInt(req.body.productId);
  const product = products.find(p => p.id === productId);
  if (product) cart.push(product);
  res.redirect("/cart");
});

app.get("/cart", (req, res) => {
  res.render("cart", { cart: cart });
});

app.listen(3001, () => {
  console.log("E-Commerce Website running on http://localhost:3001");
});