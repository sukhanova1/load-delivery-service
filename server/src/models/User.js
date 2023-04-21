const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('Registration', mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, ruquired: true },
}, {
  timestamps: {
    createdAt: 'created_date',
  },
}));

const registJoiSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(13)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(/^[a-z0-9]{3,}$/)
    .min(6)
    .max(30)
    .required(),
  role: Joi.string()
    .required(),
});

module.exports = {
  User,
  registJoiSchema,
};
