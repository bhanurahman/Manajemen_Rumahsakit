const { createPost } = require("../domain/post.checkBmi");

async function addPosts(req, res) {
  let response = "";

  const bmi = req.body.berat_badan / req.body.tinggi_badan ** 2;

  if (bmi < 17) {
    response = "Kekurangan berat badan tingkat berat";
  } else if (bmi >= 17 && bmi < 19) {
    response = "Kekurangan berat badan tingkat ringan";
  } else if (bmi >= 19 && bmi <= 25) {
    response = "Normal";
  } else if (bmi > 25 && bmi < 28) {
    response = "Kelebihan berat badan tingkat ringan";
  } else if (bmi > 27) {
    response = "Kelebihan berat badan tingkat berat";
  } else {
    response = "Coba Lagi";
  }
  const data = {
    nama_pasien: req.body.nama_pasien,
    umur: req.body.umur,
    jenis_kelamin: req.body.jenis_kelamin,
    berat_badan: req.body.berat_badan,
    tinggi_badan: req.body.tinggi_badan,
    result: response,
  };
  const create = await createPost(data);

  // await Post.create({
  //   nama_pasien,
  //   umur,
  //   jenis_kelamin,
  //   berat_badan,
  //   tinggi_badan,
  //   result: response,
  // });

  res.status(create.status).send(create.data || create);
}
module.exports = {
  addPosts,
};
