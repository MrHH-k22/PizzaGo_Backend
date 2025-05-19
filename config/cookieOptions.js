const COOKIE_OPTIONS = {
  normal: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  },
};

module.exports = COOKIE_OPTIONS;
