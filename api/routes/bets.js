const express = require('express');
const router = express.Router();

const betsController= require('../controllers/betsControllers');

router.get('/',betsController.index);
router.put('/',betsController.createBets);
router.get('/id/:id',betsController.getBetsByTicketId);

module.exports = router;