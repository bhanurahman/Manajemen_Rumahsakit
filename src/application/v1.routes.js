const express = require("express");
const app = express.Router();
const publicRoutes = express.Router();
const privateRoutes = express.Router();

const cookieSessionCtrl = require("./controller/cookie-session");
const authController = require("./controller/auth");
const postDokterCtrl = require("./controller/dokter");
const postPasienCtrl = require("./controller/pasien");
const checkBmiCtrl = require("./controller/checkBmi");
const appointmentCtrl = require("./controller/appointment")

//const auth = require("./middleware/auth");

// const bagiMiddleware = (req, res, next) => {
//   if (req.query.angka2 == 0) {
//     res.send({ message: "tidak bisa dibagi dengan 0" });
//   } else {
//     next();
//   }
// };

app.get("/", function (req, res) {
  res.send({ message: "hello dari route v1" });
});

// app.get("/set-cookie", cookieSessionCtrl.setCookie);
// app.get("/get-cookie", cookieSessionCtrl.getCookie);
// app.get("/set-session", cookieSessionCtrl.setSession);
// app.get("/get-session", cookieSessionCtrl.getSession);

app.post("/register", authController.register);
app.post("/login", authController.login);
app.get("/logout", authController.logout);

// ================= Dokter =================
app.get("/dokter", postDokterCtrl.getPosts);
app.post("/dokter", postDokterCtrl.addPosts);
app.get("/dokter/:id", postDokterCtrl.getOnePost);
app.put("/dokter/:id", postDokterCtrl.updateOne);
app.delete("/dokter/:id", postDokterCtrl.deleteOne);
// ================= Pasien =================
app.get("/pasien", postPasienCtrl.getPosts);
app.post("/pasien", postPasienCtrl.addPosts);
app.get("/pasien/:id", postPasienCtrl.getOnePost);
app.put("/pasien/:id", postPasienCtrl.updateOne);
app.delete("/pasien/:id", postPasienCtrl.deleteOne);

// ================= check bmi =================
app.post("/checkBmi", checkBmiCtrl.addPosts);

// ================= appointment =================\
app.get("/appointment", appointmentCtrl.getPosts);
app.post("/appointment", appointmentCtrl.addPosts);


// header
app.get("/get-headers", (req, res) => {
  const headers = req.headers;
  res.send({ headers });
});
app.get("/set-headers", (req, res) => {
  res.header("x-backend", "productzilla-b5");
  res.send({ message: "header sent" });
});

module.exports = app;
