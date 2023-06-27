const Post = require("../../src/database/post-pasien");
const posts = [
  {
    _id: "6499a46c620f3d530a8ed45d",
    nama_pasien: "Casemiro",
    umur: 29,
    jenis_kelamin: "Laki-Laki",
    berat_badan: 75,
    tinggi_badan: 185,
    alamat: "San Fransisco Street",
    nomor_telepon: "123463573",
    asuransi: true,
  },
  {
    _id: "6499a42e620f3d530a8ed45b",
    nama_pasien: "string",
    umur: 0,
    jenis_kelamin: "string",
    berat_badan: 0,
    tinggi_badan: 0,
    alamat: "string",
    nomor_telepon: "string",
    asuransi: true,
  }
];
async function insertManyPosts() {
  await Post.insertMany(posts);
}
async function deleteManyPosts() {
  await Post.deleteMany({});
}

module.exports = {
  posts,
  insertManyPosts,
  deleteManyPosts,
};
