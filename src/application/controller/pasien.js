const {
  fetchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../domain/post.domain.pasien.js");

async function getPosts(req, res) {
  const data = await fetchPosts();
  res.status(data.status);
  res.send(data.data);
}
async function getOnePost(req, res) {
  const id = req.params.id;
  const data = await getPost(id); // bisa pakai => Post.find({ _id: id });
  res.status(data.status);
  res.send(data);
}
async function addPosts(req, res) {
  const postData = {
    nama_pasien: req.body.nama_pasien,
    umur: req.body.umur,
    jenis_kelamin: req.body.jenis_kelamin,
    berat_badan: req.body.berat_badan,
    tinggi_badan: req.body.tinggi_badan,
    alamat: req.body.alamat,
    nomor_telepon: req.body.nomor_telepon,
    asuransi: req.body.asuransi,
  };
  const response = await createPost(postData);
  res.status(response.status).send(response.data || response);
}
async function updateOne(req, res) {
  const id = req.params.id;
  const postData = {
    nama_pasien: req.body.nama_pasien,
    umur: req.body.umur,
    jenis_kelamin: req.body.jenis_kelamin,
    berat_badan: req.body.berat_badan,
    tinggi_badan: req.body.tinggi_badan,
    alamat: req.body.alamat,
    nomor_telepon: req.body.nomor_telepon,
    asuransi: req.body.asuransi,
  };
  const response = await updatePost(id, postData);
  res.status(response.status).send(response.data || response);
}
async function deleteOne(req, res) {
  const id = req.params.id;
  const response = await deletePost(id);
  res.status(response.status).send();
}

module.exports = {
  getPosts,
  addPosts,
  getOnePost,
  updateOne,
  deleteOne,
};
