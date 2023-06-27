const {
  fetchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../domain/post.domain.dokter");

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
    nomor_registrasi: req.body.nomor_registrasi,
    nama_dokter: req.body.nama_dokter,
    profesi: req.body.profesi,
    jenis_kelamin: req.body.jenis_kelamin,
    email: req.body.email,
    nomor_telepon: req.body.nomor_telepon,
    alamat: req.body.alamat,
    jadwal_praktek: req.body.jadwal_praktek,
  };
  const response = await createPost(postData);
  res.status(response.status).send(response.data || response);
}
async function updateOne(req, res) {
  const id = req.params.id;
  const postData = {
    nomor_registrasi: req.body.nomor_registrasi,
    nama_dokter: req.body.nama_dokter,
    profesi: req.body.profesi,
    jenis_kelamin: req.body.jenis_kelamin,
    email: req.body.email,
    nomor_telepon: req.body.nomor_telepon,
    alamat: req.body.alamat,
    jadwal_praktek: req.body.jadwal_praktek,
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
