const mongoose = require('mongoose');
const Joi = require('joi');

const Truck = mongoose.model('Truck', mongoose.Schema({
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: null },
  type: { type: String },
  status: { type: String, default: 'IS' },
  dimensions: {
    width: { type: Number },
    length: { type: Number },
    height: { type: Number },
    payload: { type: Number },
  },
}, { timestamps: { createdAt: 'created_date' } }));

const truckJoiSchema = Joi.object({
  type: Joi.string().required(),
});

module.exports = {
  Truck,
  truckJoiSchema,
};
