// ================== Kerakli kutubxonalarni import qiliamiz ==================
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    productname: { type: mongoose.Schema.Types.ObjectId, ref: "product"},
    phone: { type: String, required: true},
    userName: { type: String, required: true},
    price: { type: String, required: true , default: 0},
    description: { type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now,
      },

})




  // ================= Modelni Controllerga Export qilamiz =================
  module.exports = mongoose.model("order", orderSchema);