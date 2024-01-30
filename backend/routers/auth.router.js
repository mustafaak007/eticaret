const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const secretKey = "My Secret Key: My Secret Key is qqzzyy123098";

const options = {
  expiresIn: "1h",
};

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    // burada req.body yapmamız şu işe yarıyor:Body içinde gelen tüm alanların user alanıyla eşleşen alanlarla eşleşmesini sağlayacak
    user._id = uuidv4();
    user.createDate = new Date();
    user.isAdmin = false;

    const checkUserEmail = await User.findOne({ email: user.email });

    if (checkUserEmail != null) {
      res
        .status(403)
        .json({ message: "Bu mail adresi daha önce kullanılmış!" });
    } else {
      // database'e kaydetmemize yarıyor
      await user.save();

      // register işleminden sonra token göndermesini istiyoruz
      const token = jwt.sign({}, secretKey, options);
      // sign içinde ilk selector içinde payload istiyor orayı boş bırakcaz

      let model = { token: token, user: user };
      res.json(model);
    }
  } catch (error) {
    // burada hata olursa api hatası olur o da 500 numaralı hatalardan olur
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });

    if (user == null) {
      res.status(403).json({ message: "Kullanıcı Bulunamadı!" });
    } else {
      if (user.password != password) {
        res.status(403).json({ message: "Password Uyuşmuyor!" });
      } else {
        const token = jwt.sign({}, secretKey, options);
        let model = { token: token, user: user };
        res.json(model);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
