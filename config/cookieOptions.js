const COOKIE_OPTIONS = {
  normal: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  },
};

module.exports = COOKIE_OPTIONS;
