const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/user");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek apakah username sudah terdaftar
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username sudah terdaftar" });
    }

    // Enkripsi password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek apakah username valid
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Username atau password salah" });
    }

    // Cek kesesuaian password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Username atau password salah" });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user._id }, "secretkey");

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

const logout = async (req, res) => {
  try {
    // Logika untuk logout user (misalnya menghapus token dari daftar token yang valid)

    return res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
