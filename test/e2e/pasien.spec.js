const supertest = require("supertest");
const { app } = require("../app")
const { disconnect } = require("mongoose")
const {
    insertManyPosts,
    deleteManyPosts,
} = require("../fixtures/posts-pasien");

describe("tests/e2e/pasien.spec.js", () => {
    beforeAll(() => {
        //dieksekusi sebelum semua test berjalan
    });
    beforeEach(async() => {
        //dieksekusi sebelum setiap test berjalan
        await deleteManyPosts();
        await insertManyPosts();
    });

    afterEach(async () => {
        //dieksekusi setelah setiao test berjalan
        //await deleteManyPosts();
    });

    describe("GET /pasien", () => {
        //do testing
        it("should return all posts when data exxists", async () => {
            //request posts
            const posts = await supertest(app).get("/pasien");
            expect(posts.body).toHaveLength(2);
            expect(posts.status).toBe(200);
            //expect(posts).toBeDefined();
        });
    });

    describe("POST /pasien", () => {
        //do testing positif
        it("should return inserted post when data inserted", async () => {
            const posts = await supertest(app)
            .post("/pasien")
            .send({
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
        });

        //field masih ada kosong
        it("should return error nomor_registrasi validation when nama_pasien not filled'", async () => {
            const posts = await supertest(app)
            .post("/pasien")
            .send({
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("nama_pasien harus diisi");
        });
        it("should return error nama_dokter validation when umur not filled'", async () => {
            const posts = await supertest(app)
            .post("/pasien")
            .send({
                nama_pasien: "Casemiro",
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.statusCode).toBe(400);
            expect(posts.body.message).toBe("umur harus diisi");
        });
        it("should return error nama_dokter validation when jenis_kelamin not filled'", async () => {
            const posts = await supertest(app)
            .post("/pasien")
            .send({
                nama_pasien: "Casemiro",
                umur: 29,
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.statusCode).toBe(400);
            expect(posts.body.message).toBe("jenis_kelamin harus diisi");
        });
        it("should return error nama_dokter validation when berat_badan not filled'", async () => {
            const posts = await supertest(app)
            .post("/pasien")
            .send({
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.statusCode).toBe(400);
            expect(posts.body.message).toBe("berat_badan harus diisi");
        });
        it("should return error nama_dokter validation when tinggi_badan not filled'", async () => {
            const posts = await supertest(app)
            .post("/pasien")
            .send({
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-laki",
                berat_badan: 75,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.statusCode).toBe(400);
            expect(posts.body.message).toBe("tinggi_badan harus diisi");
        });
        it("should return error nama_dokter validation when alamat not filled'", async () => {
            const posts = await supertest(app)
            .post("/pasien")
            .send({
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-laki",
                berat_badan: 75,
                tinggi_badan: 185,
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.statusCode).toBe(400);
            expect(posts.body.message).toBe("alamat harus diisi");
        });
        it("should return error nama_dokter validation when nomor_telepon not filled'", async () => {
            const posts = await supertest(app)
            .post("/pasien")
            .send({
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                asuransi: true,
            });
            expect(posts.statusCode).toBe(400);
            expect(posts.body.message).toBe("nomor_telepon harus diisi");
        });
        it("should return error nama_dokter validation when asuransi not filled'", async () => {
            const posts = await supertest(app)
            .post("/pasien")
            .send({
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
            });
            expect(posts.statusCode).toBe(400);
            expect(posts.body.message).toBe("asuransi harus diisi");
        });

        it("should return when all field are not field", async () => {
            const posts = await supertest(app).post("/pasien").send({});
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("nama_pasien harus diisi");
          });
    });
    describe("GET /pasien/:id", () => {
        it("should return one dokter when data exists", async () => {
            const posts = await supertest(app).get(
                "/pasien/6499a46c620f3d530a8ed45d"
            ); //kurang id ambil dari database
            expect(posts.status).toBe(200);
            expect(posts.body.data).toHaveProperty("nama_pasien");
            expect(posts.body.data).toHaveProperty("umur");
            expect(posts.body.data).toHaveProperty("jenis_kelamin");
            expect(posts.body.data).toHaveProperty("berat_badan");
            expect(posts.body.data).toHaveProperty("tinggi_badan");
            expect(posts.body.data).toHaveProperty("alamat");
            expect(posts.body.data).toHaveProperty("nomor_telepon");
            expect(posts.body.data).toHaveProperty("asuransi");
            expect(posts.body.data.nama_pasien).toBe("Casemiro");
            expect(posts.body.data.umur).toBe(29);
            expect(posts.body.data.jenis_kelamin).toBe("Laki-Laki");
            expect(posts.body.data.berat_badan).toBe(75);
            expect(posts.body.data.tinggi_badan).toBe(185);
            expect(posts.body.data.alamat).toBe("San Fransisco Street");
            expect(posts.body.data.nomor_telepon).toBe("123463573");
            expect(posts.body.data.asuransi).toBe(true)
        });
        it("should return not found error when data is not exists", async () => {
            const pasien = await supertest(app).get(
              "/pasien/6499a46c620f3d530a8ed45dnotfound"
            );
            expect(pasien.statusCode).toBe(404);
            expect(pasien.body.message).toBe("not found");
          });
    });
    describe("PUT /pasien/:id", () => {
        //do testing
        it("should return inserted post when data inserted", async () => {
            const posts = await supertest(app)
              .put("/pasien/6499a46c620f3d530a8ed45d")
              .send({
                //kurang id ambil dari database
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
              });
              expect(posts.status).toBe(200);
              expect(posts.body.nama_pasien).toBe("Casemiro");
              expect(posts.body.umur).toBe(29);
              expect(posts.body.jenis_kelamin).toBe("Laki-Laki");
              expect(posts.body.berat_badan).toBe(75);
              expect(posts.body.tinggi_badan).toBe(185);
              expect(posts.body.alamat).toBe("San Fransisco Street");
              expect(posts.body.nomor_telepon).toBe("123463573");
              expect(posts.body.asuransi).toBe(true)
        });
        it("should return error nama_pasien validation when nama_pasien not field", async () =>{
            const posts = await supertest(app)
            .put("/pasien/6499a46c620f3d530a8ed45d")
            .send({
                //kurang nama ambil dari database
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("nama_pasien harus diisi");
        });
        it("should return error umur validation when umur not field", async () =>{
            const posts = await supertest(app)
            .put("/pasien/6499a46c620f3d530a8ed45d")
            .send({
                //kurang umur ambil dari database
                nama_pasien: "Casemiro",
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("umur harus diisi");
        });
        it("should return error jenis_kelamin validation when jenis_kelamin not field", async () =>{
            const posts = await supertest(app)
            .put("/pasien/6499a46c620f3d530a8ed45d")
            .send({
                //kurang jenis_kelamin ambil dari database
                nama_pasien: "Casemiro",
                umur: 29,
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("jenis_kelamin harus diisi");
        });
        it("should return error berat_badan validation when berat_badan not field", async () =>{
            const posts = await supertest(app)
            .put("/pasien/6499a46c620f3d530a8ed45d")
            .send({
                //kurang berat_badan ambil dari database
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("berat_badan harus diisi");
        });
        it("should return error tinggi_badan validation when tinggi_badan not field", async () =>{
            const posts = await supertest(app)
            .put("/pasien/6499a46c620f3d530a8ed45d")
            .send({
                //kurang tinggi_badan ambil dari database
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("tinggi_badan harus diisi");
        });
        it("should return error alamat validation when alamat not field", async () =>{
            const posts = await supertest(app)
            .put("/pasien/6499a46c620f3d530a8ed45d")
            .send({
                //kurang alamat ambil dari database
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                tinggi_badan: 185,
                nomor_telepon: "123463573",
                asuransi: true,
            });
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("alamat harus diisi");
        });
        it("should return error nomor_telepon validation when nomor_telepon not field", async () =>{
            const posts = await supertest(app)
            .put("/pasien/6499a46c620f3d530a8ed45d")
            .send({
                //kurang nomor_telepon ambil dari database
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                asuransi: true,
            });
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("nomor_telepon harus diisi");
        });
        it("should return error nomor_telepon validation when nomor_telepon not field", async () =>{
            const posts = await supertest(app)
            .put("/pasien/6499a46c620f3d530a8ed45d")
            .send({
                //kurang nomor_telepon ambil dari database
                nama_pasien: "Casemiro",
                umur: 29,
                jenis_kelamin: "Laki-Laki",
                berat_badan: 75,
                tinggi_badan: 185,
                alamat: "San Fransisco Street",
                nomor_telepon: "123463573",
            });
            expect(posts.status).toBe(400);
            expect(posts.body.message).toBe("asuransi harus diisi");
        });

        it("should return when all field are not field", async () => {
            const posts = await supertest(app)
              .put("/pasien/6499a46c620f3d530a8ed45d")
              .send({}); // kurang id ambil dari databas
            expect(posts.statusCode).toBe(400);
            expect(posts.body.message).toBe("nama_pasien harus diisi");
        });
    })
    describe("DELETE /pasien/:id", () => {
        //do testing
        it("should delete one data", async () => {
          const deletePost = await supertest(app).delete(
            "/pasien/6499a46c620f3d530a8ed45d"
          ); 
          const posts = await supertest(app).get("/pasien");
          expect(deletePost.status).toBe(204);
          expect(posts.body).toHaveLength(1);
        });
    });
    
    afterAll(async () => {
        //dieksekusi setelah semua test berjalan
        await disconnect();
    });
})
