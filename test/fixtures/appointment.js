const Post = require("../../src/database/appointment");
const posts = [
  {
    _id: "649930f6ae4815bee4043e7e",
    nama_pasien: "Sancho",
    nama_dokter: "Bruno",
    jadwal_praktek: ["senin"]
  },
  {
    _id: "6499c2944ebe004672381b01",
    nama_pasien: "Ten Hag",
    nama_dokter: "Manchester United",
    jadwal_praktek: ["Jumat", "Sabtu"]
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
