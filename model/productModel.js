// ================== Kerakli kutubxonalarni import qiliamiz ==================
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productname: { type: String, required: true  , maxlength: 200},
    price: { type: String, required: true , default: 0},
    newPrice: { type: Number},
    reserve: { type: Number , default: 0},
    discount: {type: Number},
    status: {type: String, required: true},
    description: { type: String, required: true},
    soldOut: { type: Number , default: 0},
    image: [{ type: String , required:true }],
    createdAt: {
        type: Date,
        default: Date.now,
      },

})




  // ================= Modelni Controllerga Export qilamiz =================
  module.exports = mongoose.model("product", productSchema);