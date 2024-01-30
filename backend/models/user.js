const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String, //burada _ ile vermemiz lazım bu isimlendirme sabit
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
  createDate: Date,
});

//yukarısı şema

const User = mongoose.model("User", userSchema);
// bnurada da user'ı oluştuyoruz

module.exports = User;
//Paylaşıma açtık
