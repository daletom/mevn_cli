const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name field is required'],
    },
    position: {
      type: String,
      required: [true, 'position is required'],
    },
    image: {
      type: String,
      required: [false, 'image is not required'],
    },
  },
  { timestamps: true },
);

module.exports = model('users', userSchema);
