const orderModel = require("../model/order")
const productModel = require("../model/productModel")

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

exports.createOrder = async (req, res, next) => {
    const { productID } = req.params;
    const { phone, username  } = req.body;

    try {
        if (!productID || !phone || !username) {
            return res.status(400).json({
                success: false,
                message: "Malumotlarni To'liq Kiriting"
            });
        }

        const product = await productModel.findById(productID);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const newOrder = new orderModel({
            productID,
            phone,
            username,
        });

        await newOrder.save();

        // Send message to Telegram group
        const message = `🛒 Yangi buyurtma
         \n🎁 Maxsulot Nomi: ${product.productname}
         \n📞 Raqam: ${phone}
         \n😷 Ism: ${username}`;
        bot.sendMessage(process.env.TELEGRAM_GROUP_ID, message);

        res.status(201).json({
            success: true,
            message: "Tabriklaymiz sizning Arizangiz Qabul qilindi"
        });
    } catch (err) {
        console.error("Error creating order:", err.message);
        res.status(500).json({
            success: false,
            message: "Error creating order",
            error: err.message
        });
    }
};

exports.updateOrder = async (req, res, next) => {
    const { orderID, status  } = req.body;

    // Valid statuses
    const validStatuses = ["Arxiv", "Olingan", "Rad etilgan" , "Yangi"];

    try {
        if (!orderID ) {
            return res.status(400).json({ success: false, message: "Order ID required" });
        }

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        // Update the order status
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderID,
            { status  },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order: updatedOrder
        });
    } catch (err) {
        console.error("Error updating order:", err.message);
        res.status(5)} }