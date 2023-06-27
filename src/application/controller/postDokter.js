const Post = require("../../database/post-dokter");

async function getPosts(req, res) {
  const data = await Post.find({});
  res.send(data);
}
async function getOnePost(req, res) {
  const id = req.params.id;
  const data = await Post.findById(id); // bisa pakai => Post.find({ _id: id });
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
    jadwal: req.body.jadwal,
  };
  const post = new Post(postData);
  const respose = await post.save();
  res.send(respose);
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
    jadwal: req.body.jadwal,
  };
  const response = await Post.findByIdAndUpdate(id, postData); // bisa pakai => Post.updateOne({ _id: id }, postData);
  res.send(response);
}
async function deleteOne(req, res) {
  const id = req.params.id;
  const response = await Post.findByIdAndDelete(id); // bisa pakai => Post.deleteOne({ _id: id });
  res.send(response);
}

module.exports = {
  getPosts,
  addPosts,
  getOnePost,
  updateOne,
  deleteOne,
};
