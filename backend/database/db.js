const mongoose = require("mongoose");

//database uri
const uri = "";

const connection = () => {
  mongoose
    .connect(uri, {
      //options bölümü
      //   olabilicek connection hatalarının önüne geçecek iki adet options
      // node js driver versiyonu 4. ile artık bu optionlar otomatik bir şekilde etkin olarak geliyormuş
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    })
    .then(() => console.log("Database bağlantısı başarılı"))
    .catch((err) => console.log("Bağlantı hatası! Hata: " + err.message));
};

module.exports = connection;

// burada bir module'a dönüştürüyoruz çünkü js dosyalarında başka dosyaya node.js'de böyle ancak böyle aktarma yapabiliyoruz
