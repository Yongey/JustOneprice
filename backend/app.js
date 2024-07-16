const express = require("express");
const cors = require("cors");
const createHttpError = require("http-errors");

// const path = require("path");

// const modulesRoute = require("./routes/modules");
const commentRoute = require("./routes/comments");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const JORoute = require("./routes/JOuser");
const JOProduct = require("./routes/Joproduct");
const giftRoutes = require("./routes/giftRoutes");

const app = express();
app.use(cors());
app.use(express.json()); // to process JSON in request body

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
// app.use('/modules', modulesRoute);
app.use("/api/user", userRoute);
app.use("/api/comment", commentRoute);
app.use("/api/post", postRoute);
app.use("/api/gifts", giftRoutes);
app.use("/api/JO", JORoute);
app.use("/api/JOproduct", JOProduct);
// 404 han dler
app.use(function (req, res, next) {
  return next(
    createHttpError(404, `Unknown Resource ${req.method} ${req.originalUrl}`)
  );
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  return res
    .status(err.status || 500)
    .json({ error: err.message || "Unknown Server Error!" });
});

module.exports = { app };
