const supertest = require("supertest");
const { app } = require("../app");
const { disconnect } = require("mongoose");
const {
  insertManyPosts,
  deleteManyPosts,
} = require("../fixtures/appointment");

describe("tests/e2e/appointment.spec.js", () => {
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

  describe("GET /appointment", () => {
    //do testing
    it("should return all posts when data exists", async () => {
      //request posts
      const posts = await supertest(app).get("/appointment");
      expect(posts.body).toHaveLength(2);
      expect(posts.status).toBe(200);
      //expect(posts).toBeDefinded();
    });
  });

  describe("POST /appointment", () => {
    //do testing positif
    it("should return inserted post when data inserted", async () => {
        const posts = await supertest(app)
        .post("/appointment")
        .send({
            nama_pasien: "Ten Hag",
            nama_dokter: "Manchester United",
            jadwal_praktek: ["Jumat", "Sabtu"]
        });
    });
    //field masih ada kosong
    it("should return error nama_pasien validation when nama_pasien not filled'", async () => {
        const posts = await supertest(app)
        .post("/appointment")
        .send({
            nama_dokter: "Manchester United",
            jadwal_praktek: ["senin"]
        });
        expect(posts.status).toBe(400);
        expect(posts.body.message).toBe("nama_pasien harus diisi");
    });
    it("should return error nama_dokter validation when nama_dokter not filled'", async () => {
        const posts = await supertest(app)
        .post("/appointment")
        .send({
            nama_pasien: "Ten Hag",
            jadwal_praktek: ["Jumat", "Sabtu"]
        });
        expect(posts.status).toBe(400);
        expect(posts.body.message).toBe("nama_dokter harus diisi");
    });
    it("should return error jadwal_praktek validation when jadwal_praktek not filled'", async () => {
        const posts = await supertest(app)
        .post("/appointment")
        .send({
            nama_pasien: "Ten Hag",
            nama_dokter: "Manchester United"
        });
        expect(posts.status).toBe(400);
        expect(posts.body.message).toBe("jadwal_praktek harus diisi");
    });
  });

  afterAll(async() => {
    //dieksekusi setelah seumua test berjalan
    await disconnect();
  });
});