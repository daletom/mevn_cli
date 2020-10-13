const express = require('express');

const {
  createData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/user_controller');

const router = express.Router();

router
  .post('/api', createData)
  .get('/api', readData)
  .put('/:id', updateData)
  .delete('/:id', deleteData);

module.exports = router;
