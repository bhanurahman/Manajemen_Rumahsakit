const Post = require("../../database/post-pasien");

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
  if (!postData.nama_pasien || postData.nama_pasien.length == "") {
    return { status: 400, message: "nama_pasien harus diisi" };
  }
  if (!postData.umur || postData.umur.length == "") {
    return { status: 400, message: "umur harus diisi" };
  }
  if (!postData.jenis_kelamin || postData.jenis_kelamin.length == "") {
    return { status: 400, message: "jenis_kelamin harus diisi" };
  }
  if (!postData.berat_badan || postData.berat_badan.length == "") {
    return { status: 400, message: "berat_badan harus diisi" };
  }
  if (!postData.tinggi_badan || postData.tinggi_badan.length == "") {
    return { status: 400, message: "tinggi_badan harus diisi" };
  }
  if (!postData.alamat || postData.alamat.length == "") {
    return { status: 400, message: "alamat harus diisi" };
  }
  if (!postData.nomor_telepon || postData.nomor_telepon.length == "") {
    return { status: 400, message: "nomor_telepon harus diisi" };
  }
  if (!postData.asuransi || postData.asuransi.length == "") {
    return { status: 400, message: "asuransi harus diisi" };
  }
  // if (!postData.body) {
  //   return { status: 400, message: "Semua harus diisi" };
  // }
  await Post.create(postData);
  return { data: postData, status: 200 };
}
async function updatePost(id, postData) {
  if (!postData.nama_pasien || postData.nama_pasien.length == "") {
    return { status: 400, message: "nama_pasien harus diisi" };
  }
  if (!postData.umur || postData.umur.length == "") {
    return { status: 400, message: "umur harus diisi" };
  }
  if (!postData.jenis_kelamin || postData.jenis_kelamin.length == "") {
    return { status: 400, message: "jenis_kelamin harus diisi" };
  }
  if (!postData.berat_badan || postData.berat_badan.length == "") {
    return { status: 400, message: "berat_badan harus diisi" };
  }
  if (!postData.tinggi_badan || postData.tinggi_badan.length == "") {
    return { status: 400, message: "tinggi_badan harus diisi" };
  }
  if (!postData.alamat || postData.alamat.length == "") {
    return { status: 400, message: "alamat harus diisi" };
  }
  if (!postData.nomor_telepon || postData.nomor_telepon.length == "") {
    return { status: 400, message: "nomor_telepon harus diisi" };
  }
  if (!postData.asuransi || postData.asuransi.length == "") {
    return { status: 400, message: "asuransi harus diisi" };
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
