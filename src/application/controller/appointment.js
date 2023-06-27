const {
    fetchPosts,
    getPost,
    createPost,
  } = require("../domain/post.domain.appointment.js");
  
  async function getPosts(req, res) {
    const data = await fetchPosts();
    res.status(data.status);
    res.send(data.data);
  }
  async function getOnePost(req, res) {
    const id = req.params.id;
    const data = await getPost(id); // bisa pakai => Post.find({ _id: id });
    res.send(data);
  }
  async function addPosts(req, res) {
    const postData = {
      nama_pasien: req.body.nama_pasien,
      nama_dokter: req.body.nama_dokter,
      nomor_telepon_pasien: req.body.nomor_telepon,
      jadwal_praktek: req.body.jadwal_praktek,
    };
    const response = await createPost(postData);
    res.status(response.status).send(response.data || response);
  }
  module.exports = {
    getPosts,
    addPosts,
    getOnePost,
  };
  