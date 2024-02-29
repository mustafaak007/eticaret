const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const { v4: uuidv4 } = require("uuid");
const response = require("../services/response.service");

router.post("/add", async (req, res) => {
  response(res, async () => {
    const { name } = req.body;

    const checkName = await Category.findOne({ name: name });
    if (checkName != null) {
      res
        .status(403)
        .json({ message: "Bu kategori adı daha önce kullanılmış!" });
    } else {
      const category = new Category({
        _id: uuidv4(),
        name: name,
        isActive: false,
      });

      await category.save();
      res.json({ message: "Kategori kaydı başarıyla tamamlandı!" });
    }
  });
});

router.post("/removeById", async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;
    const category = await Category.findById(_id);
    if (category.isActive === false) {
      await Category.findByIdAndDelete(_id);
      res.json({
        message: `Kategori kaydı başarı ile silindi!`,
      });
    } else {
      res.json({
        message: `Kullanılan kategori silinemez!`,
      });
    }
  });
});

router.post("/update", async (req, res) => {
  response(res, async () => {
    const { _id, name } = req.body;
    const category = await Category.findOne({ _id: _id });

    if (category.name != name) {
      const checkName = await Category.findOne({ name: name });
      if (checkName != null) {
        res
          .status(403)
          .json({ message: "Bu kategori adı daha önce kullanılmış!" });
      } else {
        category.name = name;
        await Category.findByIdAndUpdate(_id, category);
        res.json({ message: "Kategori kaydı başlarıyla güncellendi!" });
      }
    }
  });
});

router.get("/", async (req, res) => {
  response(res, async () => {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  });
});

router.post("/changeStatus", async (req, res) => {
  response(res, async () => {
    const { _id, isActive } = req.body;

    let category = await Category.findById(_id);

    category = {
      isActive: isActive
    }

    await Category.findByIdAndUpdate(_id, category);
    res.json({ message: "Kategori durumu değişti" });
  });
});

module.exports = router;
