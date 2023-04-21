const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(400).send({ message: 'Please provide authorisation headers' });
  }

  const token = auth.split(' ')[1];
  if (!token) {
    return res.status(400).send({ message: 'Please include token to request' });
  }

  try {
    const tokenPayload = jwt.verify(token, process.env.SECRET_JWT_KEY); // 'secret_key'
    req.user = tokenPayload;
    next();
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};

module.exports = {
  authMiddleware,
};
