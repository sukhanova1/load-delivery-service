const express = require('express');

const router = express.Router();

const {
  getUserLoads, addUserLoad, getUserActiveLoad, iterateToNextLoadState, getUserLoadById,
  updateUserLoadById, deleteUserLoadById, postUserLoadById, getUserLoadShippingInfoById,
} = require('../controllers/loadController');
const { authMiddleware } = require('../middleware/authMiddleware');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

router.get('/', authMiddleware, getUserLoads);
router.post('/', authMiddleware, asyncWrapper(addUserLoad));
router.get('/active', authMiddleware, getUserActiveLoad);
router.patch('/active/state', authMiddleware, iterateToNextLoadState);

router.get('/:id', authMiddleware, getUserLoadById);
router.put('/:id', authMiddleware, asyncWrapper(updateUserLoadById));
router.delete('/:id', authMiddleware, deleteUserLoadById);
router.post('/:id/post', authMiddleware, postUserLoadById);
router.get('/:id/shipping_info', authMiddleware, getUserLoadShippingInfoById);

module.exports = router;
