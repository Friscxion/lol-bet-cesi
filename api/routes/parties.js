const express = require('express');
const router = express.Router();

const partiesControllers= require('../controllers/partiesControllers');

router.get('/',partiesControllers.getAllParties)

module.exports = router;