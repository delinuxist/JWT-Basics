const NotFound = (req, res) => {
  res.status(404).send("Route not Found");
};

module.exports = NotFound;
