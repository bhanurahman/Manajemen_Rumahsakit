const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    nomor_registrasi: String,
    nama_dokter: String,
    profesi: String,
    nama_dokter: String,
    jenis_kelamin: String,
    email: String,
    nomor_telepon: String,
    alamat: String,
    jadwal_praktek: Array,
  },
  { collection: "post-dokter" }
);

module.exports = mongoose.model("post-dokter", schema);
