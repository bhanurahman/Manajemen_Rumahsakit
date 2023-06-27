const Post = require("../../database/post-checkBmi");

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

  // if (!postData.body) {
  //   return { status: 400, message: "Semua harus diisi" };
  // }
  await Post.create(postData);
  return { data: postData, status: 200 };
}
module.exports = {
  createPost,
};
