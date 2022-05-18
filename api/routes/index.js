const express = require('express');
const router = express.Router();
const bddController = require("../controllers/bddController");

router.get('/reset',bddController.reset)

module.exports = router;