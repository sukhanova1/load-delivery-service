const express = require('express');

const router = express.Router();

const {
  addUserTruck, getUserTrucks, getUserTrucksById, assignTruckToUserById,
  updateUserTruckById, deleteUserTruckById,
} = require('../controllers/truckController');
const { authMiddleware } = require('../middleware/authMiddleware');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

router.get('/', authMiddleware, getUserTrucks);
router.post('/', authMiddleware, asyncWrapper(addUserTruck));

router.get('/:id', authMiddleware, getUserTrucksById);
router.put('/:id', authMiddleware, asyncWrapper(updateUserTruckById));
router.delete('/:id', authMiddleware, deleteUserTruckById);
router.post('/:id/assign', authMiddleware, assignTruckToUserById);

module.exports = router;
