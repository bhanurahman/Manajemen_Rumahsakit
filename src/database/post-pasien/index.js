const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    nama_pasien: String,
    umur: Number,
    jenis_kelamin: String,
    berat_badan: Number,
    tinggi_badan: Number,
    alamat: String,
    nomor_telepon: String,
    asuransi: Boolean,
  },
  { collection: "post-pasien" }
);

module.exports = mongoose.model("post-pasien", schema);
