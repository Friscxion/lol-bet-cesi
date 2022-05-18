const express = require('express');
const router = express.Router();

const betsController= require('../controllers/betsControllers');

router.get('/',betsController.index);
router.put('/',betsController.createBets);

module.exports = router;