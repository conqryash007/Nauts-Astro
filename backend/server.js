// module imports
// ---------------------------------
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const path = require("path");

// File imports
// ---------------------------------
const httpError = require("./models/http-error");
const userRoutes = require("./routes/user-routes");
const passRoutes = require("./routes/pass-route");
const hashRoutes = require("./routes/hash-route");
const collectionRoute = require("./routes/collection-route");

// middlewares
// ---------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
// ---------------------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

// Routes
// ---------------------------------

app.use("/api/users", userRoutes);
app.use("/api/pass", passRoutes);
app.use("/api/hash", hashRoutes);
app.use("/api/nauts", collectionRoute);

app.use((req, res, next) => {
  return next(new httpError("Could not find the route"));
});

// Error Handler
// ---------------------------------
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ ok: false, message: error.message || "Something went wrong !" });
});

// Server connect
// mongoose
//   .connect(
//     `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.PASSWORD}@cluster0.hjfrm.mongodb.net/reignkit?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT);
//     console.log("Server started successfully👍 at", PORT);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started successfully👍 at", PORT);
});
