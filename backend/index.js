const express = require("express");
const cors = require("cors");
const connection = require("./database/db");

const app = express();

app.use(express.json());
app.use(cors());

// app.get("",(req, res)=>{
//     res.json({message:"Api isteği başarılı bir şekilde çalışıyor"});
// }) //deneme amaçlı yapılşmış bir get isteği

// yaptığımız api'yi index.js'e tanıtmamız lazım

const authRouter = require("./routers/auth.router");

app.use("/api/auth", authRouter);

connection();

const port = process.env.PORT || 5000;
// process.env.PORT hangi porttan ayağa kalkacağı belli değilse otomatik olarak o hangisi olduğunu buluyormuş

app.listen(port, () =>
  console.log("Uygulama http://localhost:5000 portunda ayağa kalktı!")
);
