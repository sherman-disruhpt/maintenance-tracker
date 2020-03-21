module.exports = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  if (err.name === "LIMIT_UNEXPECTED_FILE") {
    return res.status(413).json({ message: "Too many photos to upload." });
  }

  if (err.name === "Expired" || err.name === "Permission") {
    // jwt authentication/authorization error
    return res.status(401).json({ message: err.message });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
};
