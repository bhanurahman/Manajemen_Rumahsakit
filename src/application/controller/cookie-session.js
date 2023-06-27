function setCookie(req, res) {
  res.cookie("bootcamp", "backend-productzilla", { maxAge: 60 * 1000 });
  res.send({ message: "cookie sent" });
}
function getCookie(req, res) {
  const cookieBootcamp = req.cookies.bootcamp;
  res.send({ cookieBootcamp });
}
function setSession(req, res) {
  req.session.username = "johndoe";
  res.send({ message: "session saved" });
}
function getSession(req, res) {
  const sessionUser = req.session.username;
  res.send({ sessionUser });
}

module.exports = {
  setCookie,
  getCookie,
  setSession,
  getSession,
};
