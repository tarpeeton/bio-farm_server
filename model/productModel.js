// ================== Kerakli kutubxonalarni import qiliamiz ==================
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productname: { type: String, required: true  , maxlength: 200},
    oldPrice: { type: Number ,  required: true},
    newPrice: { type: Number ,  required: true},
    status: {type: String, required: true},
    description: { type: String, required: true},
    discount: {type: Number , default: 0},
    soldOut: { type: Number , default: 0},
    image: [{ type: String , required:true }],
    createdAt: {
        type: Date,
        default: Date.now,
      },

})




  // ================= Modelni Controllerga Export qilamiz =================
  module.exports = mongoose.model("product", productSchema);