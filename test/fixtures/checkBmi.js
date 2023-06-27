const Post = require("../../src/database/post-checkBmi");
const posts = [
  {
    _id: "648166131779657bfc6d5e8c",
    nama_pasien: "pradnya",
    umur: 22,
    jenis_kelamin: "laki-laki",
    berat_badan: 70,
    tinggi_badan: 165,
  },
  {
    _id: "648166131779657bfc6d5e8d",
    nama_pasien: "puja",
    umur: 21,
    jenis_kelamin: "perempuan",
    berat_badan: 50,
    tinggi_badan: 155,
  },
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
