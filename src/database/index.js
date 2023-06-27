const mongoose = require("mongoose");
require("dotenv").config();
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

// async function connect() {
//   if (DB_USERNAME && DB_PASSWORD) {
//     await mongoose.connect(
//       `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
//     );
//     console.log(
//       "CONNECTION: ",
//       `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
//     );
//   } else {
//     await mongoose.connect(
//       `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
//     );
//     console.log(
//       "CONNECTION: ",
//       `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
//     );
//   }

async function connect() {
  await mongoose.connect(
    `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", function () {
    console.log("connected to mongodb");
  });
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = { connect, disconnect };
