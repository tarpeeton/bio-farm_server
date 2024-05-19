const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const path = require('path');
//  DbConnet
const dbConnect = require("./settings/database");
//  Routers
const OrderRoute = require("./router/orderRouter")
const Productroute = require("./router/productRouter")

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/image', express.static(path.join(__dirname, 'public/image')));

// MIDDLEWARES
app.use(cors({ origin: "https://bio-farm-frontend.vercel.app/", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use(OrderRoute)
app.use(Productroute)
// Create folders
// Connect to database
dbConnect();

// SERVER LISTENING
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => console.log("Server listening on port " + PORT));

module.exports = app;
