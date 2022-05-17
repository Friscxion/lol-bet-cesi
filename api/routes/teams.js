const express = require('express');
const router = express.Router();

const teamsControllers= require('../controllers/teamsControllers');

router.get('/',teamsControllers.getAllTeams)

module.exports = router;