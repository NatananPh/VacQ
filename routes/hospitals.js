const express = require('express');
const {getHospitals, getHospital, createHospital, updateHospital, deleteHospitals} = require('../controllers/hospitals')
const router = express.Router();

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospital).put(updateHospital).delete(updateHospital);

module.exports = router;