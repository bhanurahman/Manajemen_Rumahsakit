const supertest = require("supertest");
const { app } = require("../app");
const { disconnect } = require("mongoose");
const { insertManyPosts, deleteManyPosts } = require("../fixtures/checkBmi");

describe("tests/e2e/checkBmi.spec.js", () => {
  beforeAll(() => {
    //dieksekusi sebelum semua test berjalan
  });
  beforeEach(async () => {
    //dieksekusi sebelum setiap test berjalan
    await insertManyPosts();
    await deleteManyPosts();
  });

  afterEach(async () => {
    //dieksekusi setelah setiap test berjalan
    //await deleteManyPosts();
  });

  describe("POST /checkBmi", () => {
    //do testing positif
    it("should return inserted post when data inserted", async () => {
      const posts = await supertest(app).post("/checkBmi").send({
        nama_pasien: "pradnya",
        umur: 20,
        jenis_kelamin: "laki-laki",
        berat_badan: 70,
        tinggi_badan: 165,
      });
      expect(posts.status).toBe(200);
      expect(posts.body.nama_pasien).toBe("pradnya");
      expect(posts.body.umur).toBe(20);
      expect(posts.body.jenis_kelamin).toBe("laki-laki");
      expect(posts.body.berat_badan).toBe(70);
      expect(posts.body.tinggi_badan).toBe(165);
    });

    // field masih ada kosong
    it("should return error nama_pasien validation when nama_pasien not filled", async () => {
      const posts = await supertest(app).post("/checkBmi").send({
        umur: 20,
        jenis_kelamin: "laki-laki",
        berat_badan: 70,
        tinggi_badan: 165,
      });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nama_pasien harus diisi");
    });
    it("should return error umur validation when umur not filled", async () => {
      const posts = await supertest(app).post("/checkBmi").send({
        nama_pasien: "pradnya",
        jenis_kelamin: "laki-laki",
        berat_badan: 70,
        tinggi_badan: 165,
      });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("umur harus diisi");
    });
    it("should return error jenis_kelamin validation when jenis_kelamin not filled", async () => {
      const posts = await supertest(app).post("/checkBmi").send({
        nama_pasien: "pradnya",
        umur: 20,
        berat_badan: 70,
        tinggi_badan: 165,
      });
      expect(posts.statusCode).toBe(400);
      expect(posts.body.message).toBe("jenis_kelamin harus diisi");
    });
    it("should return error berat_badan validation when berat_badan not filled", async () => {
      const posts = await supertest(app).post("/checkBmi").send({
        nama_pasien: "pradnya",
        umur: 20,
        jenis_kelamin: "laki-laki",
        tinggi_badan: 165,
      });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("berat_badan harus diisi");
    });
    it("should return error tinggi_badan validation when tinggi_badan not filled", async () => {
      const posts = await supertest(app).post("/checkBmi").send({
        nama_pasien: "pradnya",
        umur: 20,
        jenis_kelamin: "laki-laki",
        berat_badan: 70,
      });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("tinggi_badan harus diisi");
    });

    it("should return when all field are not field", async () => {
      const posts = await supertest(app).post("/checkBmi").send({});
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe("nama_pasien harus diisi");
    });
  });

  afterAll(async () => {
    //dieksekusi setelah semua test berjalan
    await disconnect();
  });
});
