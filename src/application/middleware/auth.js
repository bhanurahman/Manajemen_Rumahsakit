function auth(req, res, next) {
  const authHeader = req.header("Authorization");
  const key = "abcdefghijklmnopqrstuvwxyz";
  if (authHeader !== key) {
    res.status(401).send({ message: "unauthorized" });
  }
  next();
}

module.exports = auth;
