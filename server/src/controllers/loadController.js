const mongoose = require('mongoose');
const { Load, loadJoiSchema } = require('../models/Load');
const { Truck } = require('../models/Truck');

const getUserLoads = async (req, res, next) => {
  if (req.user.role !== 'SHIPPER') {
    return res.status(400).send({ message: 'You are not allowed to get Load' });
  }
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;
  await Load.find({ created_by: req.user.userId }, '-__v')
    .skip(offset)
    .limit(limit)
    .then((loads) => res.status(200).send({ loads }))
    .catch((err) => next(err));
};

const addUserLoad = async (req, res, next) => {
  if (req.user.role !== 'SHIPPER') {
    return res.status(400).send({ message: 'You are not allowed to add Load' });
  }
  await loadJoiSchema.validateAsync(req.body);
  const {
    name, payload, pickup_address, delivery_address, dimensions,
  } = req.body;
  const load = new Load({
    created_by: req.user.userId,
    name,
    payload,
    pickup_address,
    delivery_address,
    dimensions: {
      width: dimensions.width,
      length: dimensions.length,
      height: dimensions.height,
    },
  });
  return load.save()
    .then(() => res.status(200).send({ message: 'Load was created successfully' }))
    .catch((err) => next(err));
};

const getUserActiveLoad = async (req, res, next) => {
  if (req.user.role !== 'DRIVER') {
    return res.status(400).send({ message: 'You are not allowed to get active Load' });
  }
  await Load.find({ assigned_to: req.user.userId }, '-__v')
    .then((load) => res.status(200).send({ load }))
    .catch((err) => next(err));
};

const iterateToNextLoadState = async (req, res, next) => {
  if (req.user.role !== 'DRIVER') {
    return res.status(400).send({ message: 'You are not allowed to change active Load' });
  }
  const truck = await Truck.findOne({ assigned_to: req.user.userId });
  await Load.findOneAndUpdate(
    { assigned_to: req.user.userId, status: 'ASSIGNED' },
    { $set: { state: 'Arrived to delivery', status: 'SHIPPED' } },
  )
    .then(() => {
      truck.status = 'IS';
      truck.assigned_to = null;
      truck.save();
      res.status(200).send({ message: 'Load state changed to \'Arrived to delivery\'' });
    })
    .catch((err) => next(err));
};

const getUserLoadById = async (req, res, next) => {
  if (req.user.role !== 'SHIPPER') {
    return res.status(400).send({ message: 'You are not allowed to get Load' });
  }
  const { id } = req.params;
  await Load.findById({ _id: id })
    .then((load) => res.status(200).json({ load }))
    .catch((err) => next(err));
};

const updateUserLoadById = async (req, res, next) => {
  if (req.user.role !== 'SHIPPER') {
    return res.status(400).send({ message: 'You are not allowed to update Load' });
  }
  await loadJoiSchema.validateAsync(req.body);
  const {
    name, payload, pickup_address, delivery_address, dimensions,
  } = req.body;
  await Load.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id), status: 'NEW' },
    {
      $set: {
        name,
        payload,
        pickup_address,
        delivery_address,
        dimensions: {
          width: dimensions.width,
          length: dimensions.length,
          height: dimensions.height,
        },
      },
    },
  )
    .then((data) => res.status(200).send({ message: 'Load details changed successfully', d: data }))
    .catch((err) => next(err));
};

const deleteUserLoadById = async (req, res, next) => {
  if (req.user.role !== 'SHIPPER') {
    return res.status(400).send({ message: 'You are not allowed to delete Load' });
  }
  const { id } = req.params;
  await Load.findByIdAndDelete({ _id: mongoose.Types.ObjectId(id), status: 'NEW' })
    .then(() => res.status(200).json({ message: 'Load deleted successfully' }))
    .catch((err) => next(err));
};

const postUserLoadById = async (req, res, next) => {
  if (req.user.role !== 'SHIPPER') {
    return res.status(400).send({ message: 'You are not allowed to post Load' });
  }
  const { id } = req.params;
  const load = await Load.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(id), status: 'NEW' },
    { $set: { status: 'POSTED' } },
  );
  await Truck.findOne({
    assigned_to: { $ne: null },
    status: 'IS',
    'dimensions.width': { $gt: load.dimensions.width },
    'dimensions.length': { $gt: load.dimensions.length },
    'dimensions.height': { $gt: load.dimensions.height },
    'dimensions.payload': { $gt: load.payload },
  })
    .then(async (truck) => {
      if (truck === null) {
        await Load.findByIdAndUpdate(
          { _id: mongoose.Types.ObjectId(id), status: 'POSTED' },
          { $set: { status: 'NEW' } },
        );
        return res.status(400).send({ message: 'Driver was not found', driver_found: false });
      }
      truck.status = 'OL';
      truck.save();
      load.assigned_to = truck.assigned_to;
      load.status = 'ASSIGNED';
      load.state = 'En route to Pick Up';
      load.logs = [{
        message: `Load assigned to driver with id ${truck.assigned_to}`,
        time: `${new Date().toISOString()}`,
      }];
      load.save();
      return res.status(200).send({ message: 'Load posted successfully', driver_found: true });
    })
    .catch((err) => next(err));
};

const getUserLoadShippingInfoById = async (req, res, next) => {
  if (req.user.role !== 'SHIPPER') {
    return res.status(400).send({ message: 'You are not allowed to get shipping info about Load' });
  }
  const load = await Load.findOne({ _id: req.params.id, status: 'ASSIGNED' });
  await Truck.findOne({ assigned_to: load.assigned_to })
    .then((truck) => res.status(200).send({ load, truck }))
    .catch((err) => next(err));
};

module.exports = {
  getUserLoads,
  addUserLoad,
  getUserActiveLoad,
  iterateToNextLoadState,
  getUserLoadById,
  updateUserLoadById,
  deleteUserLoadById,
  postUserLoadById,
  getUserLoadShippingInfoById,
};
