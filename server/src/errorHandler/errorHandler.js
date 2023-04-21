function errorHandler(err, req, res, next) {
  if (err.status === undefined) {
    res.status(400).send({ message: err.message });
    return;
  }
  if (err) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: 'Server error' });
}

module.exports = {
  errorHandler,
};
