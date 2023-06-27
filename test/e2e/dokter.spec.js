const supertest = require("supertest");
const { app } = require("../app");
const { disconnect } = require("mongoose");
const {
  insertManyPosts,
  deleteManyPosts,
} = require("../fixtures/posts-dokter");

describe("tests/e2e/dokter.spec.js", () => {
  beforeAll(() => {
    //dieksekusi sebelum semua test berjalan
  });
  beforeEach(async () => {
    //dieksekusi sebelum setiap test berjalan
    await deleteManyPosts();
    await insertManyPosts();
  });

  afterEach(async () => {
    //dieksekusi setelah setiap test berjalan
    //await deleteManyPosts();
  });

  describe("GET /dokter", () => {
    //do testing
    it("should return all posts when data exists", async () => {
      //request posts
      const posts = await supertest(app).get("/dokter");
      expect(posts.body).toHaveLength(4);
      expect(posts.status).toBe(200);
      //expect(posts).toBeDefinded();
    });
  });

  describe("POST /dokter", () => {
    //do testing positif
    it("should return inserted post when data inserted", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(200);
      expect(posts.body.nomor_registrasi).toBe("A003");
      expect(posts.body.nama_dokter).toBe("dr. Surya Giri");
      expect(posts.body.profesi).toBe("umum");
      expect(posts.body.jenis_kelamin).toBe("Laki-Laki");
      expect(posts.body.email).toBe("surya@gmail.com");
      expect(posts.body.nomor_telepon).toBe("081777278020");
      expect(posts.body.alamat).toBe("jl. kori nuansa");
      expect(posts.body.jadwal_praktek).toStrictEqual([
        "selasa",
        "rabu",
        "sabtu",
      ]);
    });

    // field masih ada kosong
    it("should return error nomor_registrasi validation when nomor_registrasi not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nomor_registrasi harus diisi");
    });
    it("should return error nama_dokter validation when nama_dokter not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nama_dokter harus diisi");
    });
    it("should return error profesi validation when profesi not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.statusCode).toBe(400);
      expect(posts.body.message).toBe("profesi harus diisi");
    });
    it("should return error jenis_kelamin validation when jenis_kelamin not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("jenis_kelamin harus diisi");
    });
    it("should return error email validation when email not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          nomor_telepon: "081777278020",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("email harus diisi");
    });
    it("should return error nomor_telepon validation when nomor_telepon not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          alamat: "jl. kori nuansa",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nomor_telepon harus diisi");
    });
    it("should return error alamat validation when alamat not filled'", async () => {
      const posts = await supertest(app)
        .post("/dokter")
        .send({
          nomor_registrasi: "A003",
          nama_dokter: "dr. Surya Giri",
          profesi: "umum",
          jenis_kelamin: "Laki-Laki",
          email: "surya@gmail.com",
          nomor_telepon: "081777278020",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("alamat harus diisi");
    });
    it("should return error jadwal validation when jadwal not filled'", async () => {
      const posts = await supertest(app).post("/dokter").send({
        nomor_registrasi: "A003",
        nama_dokter: "dr. Surya Giri",
        profesi: "umum",
        jenis_kelamin: "Laki-Laki",
        email: "surya@gmail.com",
        nomor_telepon: "081777278020",
        alamat: "jl. kori nuansa",
      });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("jadwal_praktek harus diisi");
    });

    it("should return when all field are not field", async () => {
      const posts = await supertest(app).post("/dokter").send({});
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nomor_registrasi harus diisi");
    });
  });
  describe("GET /dokter/:id", () => {
    it("should return one dokter when data exists", async () => {
      const posts = await supertest(app).get(
        "/dokter/648166131779657bfc6d5e8c"
      ); // kurang id ambil dari databas
      expect(posts.status).toBe(200);
      expect(posts.body.data).toHaveProperty("nomor_registrasi");
      expect(posts.body.data).toHaveProperty("nama_dokter");
      expect(posts.body.data).toHaveProperty("profesi");
      expect(posts.body.data).toHaveProperty("jenis_kelamin");
      expect(posts.body.data).toHaveProperty("email");
      expect(posts.body.data).toHaveProperty("nomor_telepon");
      expect(posts.body.data).toHaveProperty("alamat");
      expect(posts.body.data.nomor_registrasi).toBe("A001");
      expect(posts.body.data.nama_dokter).toBe("dr. Gus Arya");
      expect(posts.body.data.profesi).toBe("Sp.Ak");
      expect(posts.body.data.jenis_kelamin).toBe("Laki-Laki");
      expect(posts.body.data.email).toBe("gusarya@gmail.com");
      expect(posts.body.data.nomor_telepon).toBe("081888278019");
      expect(posts.body.data.alamat).toBe("jl. kuta baru");
      expect(posts.body.data.jadwal_praktek).toStrictEqual([
        "senin",
        "rabu",
        "jumat",
      ]);
    });
    it("should return not found error when data is not exists", async () => {
      const dokter = await supertest(app).get(
        "/dokter/64871282407585f33503200cnotfound"
      );
      expect(dokter.statusCode).toBe(404);
      expect(dokter.body.message).toBe("not found");
    });
  });
  describe("PUT /dokter/:id", () => {
    //do testing
    it("should return inserted post when data inserted", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8c")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(200);
      expect(posts.body.nomor_registrasi).toBe("A001");
      expect(posts.body.nama_dokter).toBe("dr. Gus Arya");
      expect(posts.body.profesi).toBe("Sp.Ak");
      expect(posts.body.jenis_kelamin).toBe("Laki-Laki");
      expect(posts.body.email).toBe("gusarya@gmail.com");
      expect(posts.body.nomor_telepon).toBe("081777278020");
      expect(posts.body.alamat).toBe("jl. kuta baru");
      expect(posts.body.jadwal_praktek).toStrictEqual([
        "selasa",
        "rabu",
        "sabtu",
      ]);
    });
    it("should return error nomor_registrasi validation when nomor_registrasi not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8c")
        .send({
          // kurang id ambil dari database
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          nomor_telepon: "081777278020",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nomor_registrasi harus diisi");
    });
    it("should return error nama_dokteri validation when nama_dokter not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A102",
          profesi: "umum",
          jenis_kelamin: "perempuan",
          email: "riska@gmail.com",
          nomor_telepon: "081888356019",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nama_dokter harus diisi");
    });
    it("should return error profesi validation when profesi not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A102",
          nama_dokter: "dr. Riska",
          jenis_kelamin: "perempuan",
          email: "riska@gmail.com",
          nomor_telepon: "081888356019",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("profesi harus diisi");
    });
    it("should return error jenis_kelamin validation when jenis_kelamin not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A102",
          nama_dokter: "dr. Riska",
          profesi: "umum",
          email: "riska@gmail.com",
          nomor_telepon: "081888356019",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("jenis_kelamin harus diisi");
    });
    it("should return error email validation when email not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A102",
          nama_dokter: "dr. Riska",
          profesi: "umum",
          jenis_kelamin: "perempuan",
          nomor_telepon: "081888356019",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("email harus diisi");
    });
    it("should return error nomor_telepon validation when nomor_telepon not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A001",
          nama_dokter: "dr. Gus Arya",
          profesi: "Sp.Ak",
          jenis_kelamin: "Laki-Laki",
          email: "gusarya@gmail.com",
          alamat: "jl. kuta baru",
          jadwal_praktek: ["selasa", "rabu", "sabtu"],
        });
      expect(posts.statusCode).toBe(400);
      expect(posts.body.message).toBe("nomor_telepon harus diisi");
    });
    it("should return error alamat validation when alamat not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A102",
          nama_dokter: "dr. Riska",
          profesi: "umum",
          jenis_kelamin: "perempuan",
          email: "riska@gmail.com",
          nomor_telepon: "081888356019",
          jadwal_praktek: ["selasa", "kamis", "jumat"],
        });
      expect(posts.statusCode).toBe(400);
      expect(posts.body.message).toBe("alamat harus diisi");
    });

    it("should return error jadwal_praktek validation when jadwal_praktek not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({
          // kurang id ambil dari database
          nomor_registrasi: "A102",
          nama_dokter: "dr. Riska",
          profesi: "umum",
          jenis_kelamin: "perempuan",
          email: "riska@gmail.com",
          nomor_telepon: "081888356019",
          alamat: "jl. kuta raya",
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("jadwal_praktek harus diisi");
    });

    it("should return when all field are not field", async () => {
      const posts = await supertest(app)
        .put("/dokter/648166131779657bfc6d5e8d")
        .send({}); // kurang id ambil dari databas
      expect(posts.statusCode).toBe(400);
      expect(posts.body.message).toBe("nomor_registrasi harus diisi");
    });
  });

  describe("DELETE /dokter/:id", () => {
    //do testing
    it("should delete one data", async () => {
      const deletePost = await supertest(app).delete(
        "/dokter/648166131779657bfc6d5e8d"
      ); // kurang id ambil dari databas
      const posts = await supertest(app).get("/dokter");
      expect(deletePost.status).toBe(204);
      expect(posts.body).toHaveLength(3);
    });
  });

  afterAll(async () => {
    //dieksekusi setelah semua test berjalan
    await disconnect();
  });
});
