const express = require('express');
const router = express.Router();

const ticketsController= require('../controllers/ticketsController');

router.get('/',ticketsController.getAllTickets)
router.put('/',ticketsController.newTickets)
module.exports = router;