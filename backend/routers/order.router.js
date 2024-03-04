const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
const Order = require("../models/order");
const Basket = require("../models/basket");
const respone = require("../services/response.service");

router.post("/create", async (req, res) => {
  respone(res, async () => {
    const { userId } = req.body;
    let baskets = await Basket.find({ userId: userId });
    //Toplu bir şekilde yapmak için boş dizi oluşturduk
    const orders = [];
    const basketIdsToDelete = [];

    for (const element of baskets) {
      let order = new Order();
      order._id = uuidv4();
      order.productId = element.productId;
      order.price = element.price;
      order.quantity = element.quantity;
      order.userId = userId;
      order.createdDate = new Date();

      orders.push(order);
      basketIdsToDelete.push(element._id);
    }
    // Çoklu ekleme örneği
    await Order.insertMany(orders);
    // $in ile herbir dizi elemanının içindeki değer ile eşleşen değeri eşler ve silme işlemi gerçekleştirir
    await Basket.deleteMany({ _id: { $in: basketIdsToDelete } });
    res.json({ message: "Siparişiniz başarıyla oluşturuldu!" });
  });
});

router.post("/", async (req, res) => {
  respone(res, async () => {
    const { userId } = req.body;
    let orders = await Order.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
    ]).sort({ createdDate: -1 });

    res.json(orders);
  });
});

module.exports = router;
