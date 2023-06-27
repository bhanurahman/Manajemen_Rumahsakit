const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    nama_pasien: String,
    nama_dokter: String,
    nomor_telepon_pasien: String,
    jadwal_praktek: Array,
  },
  { collection: "appointment" }
);

module.exports = mongoose.model("appointment", schema);