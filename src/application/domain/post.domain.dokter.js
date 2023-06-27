const Post = require("../../database/post-dokter");

async function fetchPosts() {
  const data = await Post.find({});
  return { data, status: 200 };
}
async function getPost(id) {
  try {
    const response = await Post.findOne({ _id: id });
    return { data: response, status: 200 };
  } catch (error) {
    return { status: 404, message: "not found" };
  }
}
async function createPost(postData) {
  if (!postData.nomor_registrasi || postData.nomor_registrasi.length == "") {
    return { status: 400, message: "nomor_registrasi harus diisi" };
  }
  if (!postData.nama_dokter || postData.nama_dokter.length == "") {
    return { status: 400, message: "nama_dokter harus diisi" };
  }
  if (!postData.profesi || postData.profesi.length == "") {
    return { status: 400, message: "profesi harus diisi" };
  }
  if (!postData.jenis_kelamin || postData.jenis_kelamin.length == "") {
    return { status: 400, message: "jenis_kelamin harus diisi" };
  }
  if (!postData.email || postData.email.length == "") {
    return { status: 400, message: "email harus diisi" };
  }
  if (!postData.nomor_telepon || postData.nomor_telepon.length == "") {
    return { status: 400, message: "nomor_telepon harus diisi" };
  }
  if (!postData.alamat || postData.alamat.length == "") {
    return { status: 400, message: "alamat harus diisi" };
  }
  if (!postData.jadwal_praktek || postData.jadwal_praktek.length == "") {
    return { status: 400, message: "jadwal_praktek harus diisi" };
  }
  // if (!postData.body) {
  //   return { status: 400, message: "Semua harus diisi" };
  // }
  await Post.create(postData);
  return { data: postData, status: 200 };
}
async function updatePost(id, postData) {
  if (!postData.nomor_registrasi || postData.nomor_registrasi.length == "") {
    return { status: 400, message: "nomor_registrasi harus diisi" };
  }
  if (!postData.nama_dokter || postData.nama_dokter.length == "") {
    return { status: 400, message: "nama_dokter harus diisi" };
  }
  if (!postData.profesi || postData.profesi.length == "") {
    return { status: 400, message: "profesi harus diisi" };
  }
  if (!postData.jenis_kelamin || postData.jenis_kelamin.length == "") {
    return { status: 400, message: "jenis_kelamin harus diisi" };
  }
  if (!postData.email || postData.email.length == "") {
    return { status: 400, message: "email harus diisi" };
  }
  if (!postData.nomor_telepon || postData.nomor_telepon.length == "") {
    return { status: 400, message: "nomor_telepon harus diisi" };
  }
  if (!postData.alamat || postData.alamat.length == "") {
    return { status: 400, message: "alamat harus diisi" };
  }
  if (!postData.jadwal_praktek || postData.jadwal_praktek.length == "") {
    return { status: 400, message: "jadwal_praktek harus diisi" };
  }
  // if (!postData.body) {
  //   return { status: 400, message: "Semua harus diisi" };
  // }
  await Post.updateOne({ _id: id }, postData);
  return { data: postData, status: 200 };
}
async function deletePost(id) {
  await Post.deleteOne({ _id: id });
  return { status: 204 };
}

module.exports = {
  fetchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
