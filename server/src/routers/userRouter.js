const express = require('express');

const router = express.Router();
const {
  createUser, login, forgotPassword, getUserInfo, changeUserPassword, deleteAccount,
} = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

router.post('/auth/register', asyncWrapper(createUser));
router.post('/auth/login', login);
router.post('/auth/forgot_password', forgotPassword);

router.get('/users/me', authMiddleware, getUserInfo);
router.patch('/users/me/password', authMiddleware, changeUserPassword);
router.delete('/users/me', authMiddleware, deleteAccount);

module.exports = router;
