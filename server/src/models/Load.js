const Joi = require('joi');
const mongoose = require('mongoose');

const Load = mongoose.model('Load', mongoose.Schema({
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: null },
  status: { type: String, default: 'NEW' },
  state: { type: String, default: null },
  name: { type: String },
  payload: { type: Number },
  pickup_address: { type: String },
  delivery_address: { type: String },
  dimensions: {
    width: { type: Number },
    length: { type: Number },
    height: { type: Number },
  },
  logs: [{
    message: { type: String },
    time: { type: String },
  }],
}, { timestamps: { createdAt: 'created_date' } }));

const loadJoiSchema = Joi.object({
  name: Joi.string(),
  payload: Joi.number().integer().positive().max(4000),
  pickup_address: Joi.string(),
  delivery_address: Joi.string(),
  dimensions: {
    width: Joi.number().integer().positive().max(700),
    length: Joi.number().integer().positive().max(350),
    height: Joi.number().integer().positive().max(200),
  },
});

module.exports = {
  Load,
  loadJoiSchema,
};
