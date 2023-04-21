const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const genPassword = require('generate-password');
// const dotenv = require('dotenv');
// dotenv.config();

const { User, registJoiSchema } = require('../models/User');
const { sendEmail } = require('../utils/sendEmail');

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  await registJoiSchema.validateAsync({
    name, email, password, role, 
  });
  const user = new User({
    name,
    email,
    password: await bcryptjs.hash(password, 10),
    role,
  });
  return user.save()
    .then(() => res.status(200).send({ message: 'Profile created successfully' }))
    .catch((err) => next(err));
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user === null
    || await bcryptjs.compare(String(req.body.password), String(user.password)) === false) {
    return res.status(400).send({ message: 'Not authorised' });
  }
  const token = jwt.sign({
    email: user.email,
    userId: user._id,
    role: user.role,
  }, process.env.SECRET_JWT_KEY); // 'secret_key'
  return res.status(200).send({ jwt_token: token });
};

const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send({ message: 'User with given email does not exist' });
    return;
  }
  const newPassword = genPassword.generate({ length: 9, numbers: true });
  user.password = await bcryptjs.hash(newPassword, 10);
  user.save()
    .then((data) => sendEmail(data.email, 'Password reset', `Your new password is ${newPassword}`))
    .then(() => res.status(200).send({ message: 'password reset successfully' }))
    .catch((err) => next(err));
};

const getUserInfo = async (req, res, next) => {
  await User.findById(req.user.userId)
    .then((result) => res.status(200).send({
      user: {
        id: result._id,
        role: result.role,
        name: result.name,
        email: result.email,
        created_date: result.created_date,
      },
    }))
    .catch((err) => next(err));
};

const changeUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ _id: req.user.userId });
  if (!user || await bcryptjs.compare(String(oldPassword), String(user.password)) === false) {
    res.status(400).send({ message: 'Incorrect password' });
    return;
  }
  user.password = await bcryptjs.hash(newPassword, 10);
  user.save()
    .then(() => res.status(200).json({ message: 'Password was successfully changed' }))
    .catch((err) => next(err));
};

const deleteAccount = async (req, res, next) => {
  await User.findByIdAndDelete({ _id: req.user.userId })
    .then(() => res.status(200).json({ message: 'Profile deleted successfully' }))
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  login,
  forgotPassword,
  getUserInfo,
  changeUserPassword,
  deleteAccount,
};
