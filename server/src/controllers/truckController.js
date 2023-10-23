const mongoose = require('mongoose');
const { Truck, truckJoiSchema } = require('../models/Truck');
const { changeDimensions } = require('../utils/changeDimensions');

const getUserTrucks = async (req, res, next) => {
  if (req.user.role !== 'DRIVER') {
    return res.status(400).send({ message: 'You are not allowed to get Truck' });
  }
  await Truck.find({ created_by: req.user.userId }, '-__v')
    .then((trucks) => res.status(200).send({ trucks }))
    .catch((err) => next(err));
};

const addUserTruck = async (req, res, next) => {
  if (req.user.role !== 'DRIVER') {
    return res.status(400).send({ message: 'You are not allowed to add Truck' });
  }
  const { type } = req.body;
  const dimensions = changeDimensions(type);
  if (!dimensions) {
    res.status(400).send({ message: 'Invalid type' });
  }
  const truck = new Truck({
    created_by: req.user.userId,
    type: req.body.type,
    dimensions: {
      width: dimensions.x,
      length: dimensions.y,
      height: dimensions.z,
      payload: dimensions.payload,
    },
  });
  return truck.save()
    .then(() => res.status(200).send({ message: 'Truck was created successfully' }))
    .catch((err) => next(err));
};

const getUserTrucksById = async (req, res, next) => {
  if (req.user.role !== 'DRIVER') {
    return res.status(400).send({ message: 'You are not allowed to get Truck' });
  }
  const { id } = req.params;
  await Truck.findById({ _id: id })
    .then((truck) => res.status(200).json({ truck }))
    .catch((err) => next(err));
};

const updateUserTruckById = async (req, res, next) => {
  if (req.user.role !== 'DRIVER') {
    return res.status(400).send({ message: 'You are not allowed to update Truck' });
  }
  const { type } = req.body;
  await truckJoiSchema.validateAsync({ type });
  const { id } = req.params;
  const dimensions = changeDimensions(type);
  if (!dimensions) {
    res.status(400).send({ message: 'Invalid type' });
  }
  await Truck.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(id), assigned_to: null },
    {
      $set: {
        type,
        dimensions: {
          x: dimensions.x,
          y: dimensions.y,
          z: dimensions.z,
          payload: dimensions.payload,
        },
      },
    },
  )
    .then(() => res.status(200).json({ message: 'Truck details changed successfully' }))
    .catch((err) => next(err));
};

const deleteUserTruckById = async (req, res, next) => {
  if (req.user.role !== 'DRIVER') {
    return res.status(400).send({ message: 'You are not allowed to delete Truck' });
  }
  const { id } = req.params;
  await Truck.findByIdAndDelete(
    { _id: mongoose.Types.ObjectId(id), assigned_to: null },
  )
    .then(() => res.status(200).json({ message: 'Truck deleted successfully' }))
    .catch((err) => next(err));
};

const assignTruckToUserById = async (req, res, next) => {
  if (req.user.role !== 'DRIVER') {
    return res.status(400).send({ message: 'You are not allowed to assign Truck' });
  }
  const { id } = req.params;
  const truck = await Truck.findById({ _id: id });
  truck.assigned_to = req.user.userId;
  return truck.save()
    .then(() => res.status(200).json({ message: 'Truck was assigned successfully' }))
    .catch((err) => next(err));
};

module.exports = {
  addUserTruck,
  getUserTrucks,
  getUserTrucksById,
  updateUserTruckById,
  deleteUserTruckById,
  assignTruckToUserById,
};
