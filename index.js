const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const mongodbConnectSession = require("connect-mongodb-session")(expressSession);
require('dotenv').config();
const cookieParser = require("cookie-parser");
const dbConnect = require("./settings/database");

const app = express();

// SESSION SETTINGS
const session = expressSession({
  secret: process.env.SECRET_KEY,
  saveUninitialized: false,
  store: new mongodbConnectSession({
    uri: process.env.DATABASE_URL,
    collection: process.env.COLLECTION,
  }),
  resave: false,
  cookie: {
    maxAge: 60000, // Increase the session duration as needed
    httpOnly: true,
    sameSite: "strict",
  },
});

// MIDDLEWARES
app.use(cookieParser());
app.use(session);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES

// Create folders
// Connect to database
dbConnect();

// SERVER LISTENING
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => console.log("Server listening on port " + PORT));

module.exports = app;
