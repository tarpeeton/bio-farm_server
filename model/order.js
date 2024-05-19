// ================== Kerakli kutubxonalarni import qiliamiz ==================
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "product"},
    phone: { type: String, required: true},
    username: { type: String, required: true},
    status: {
      type: String,
      enum: ["Arxiv", "Olingan", "Rad etilgan" , "Yangi"],
      default: "Yangi"
  },
    createdAt: {
        type: Date,
        default: Date.now,
      },

})




  // ================= Modelni Controllerga Export qilamiz =================
  module.exports = mongoose.model("order", orderSchema);