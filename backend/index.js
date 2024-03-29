const express = require("express");
const cors = require("cors");
const connection = require("./database/db");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("",(req, res)=>{
//     res.json({message:"Api isteği başarılı bir şekilde çalışıyor"});
// }) //deneme amaçlı yapılşmış bir get isteği

// yaptığımız api'yi index.js'e tanıtmamız lazım

const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");
const productRouter = require("./routers/product.router");
const basketRouter = require("./routers/basket.router");
const orderRouter = require("./routers/order.router");

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/baskets", basketRouter);
app.use("/api/orders", orderRouter);

connection();

const port = process.env.PORT || 5000;
// process.env.PORT hangi porttan ayağa kalkacağı belli değilse otomatik olarak o hangisi olduğunu buluyormuş

app.listen(port, () =>
  console.log("Uygulama http://localhost:5000 portunda ayağa kalktı!")
);
