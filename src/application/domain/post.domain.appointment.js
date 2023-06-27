const Post = require("../../database/appointment");

async function fetchPosts() {
  const data = await Post.find({});
  return { data, status: 200 };
}
async function createPost(postData) {
  if (!postData.nama_pasien || postData.nama_pasien.length == "") {
    return { status: 400, message: "nama_pasien harus diisi" };
  }
  if (!postData.nama_dokter || postData.nama_dokter.length == "") {
    return { status: 400, message: "nama_dokter harus diisi" };
  }
  if (!postData.jadwal_praktek || postData.jadwal_praktek.length == "") {
    return { status: 400, message: "jadwal_praktek harus diisi" };
  }
  // if (!postData.body) {
  //   return { status: 400, message: "Semua harus diisi" };
  // }
  await Post.create(postData);
  return { data: postData, status: 200 };
}

module.exports = {
  fetchPosts,
  createPost,
};
