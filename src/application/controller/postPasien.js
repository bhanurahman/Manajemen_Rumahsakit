const Post = require("../../database/post-pasien");

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
    nama_pasien: req.body.nama_pasien,
    umur: req.body.umur,
    jenis_kelamin: req.body.jenis_kelamin,
    berat_badan: req.body.berat_badan,
    tinggi_badan: req.body.tinggi_badan,
    alamat: req.body.alamat,
    nomor_telepon: req.body.nomor_telepon,
    asuransi: req.body.asuransi,
  };
  const post = new Post(postData);
  const respose = await post.save();
  res.send(respose);
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
