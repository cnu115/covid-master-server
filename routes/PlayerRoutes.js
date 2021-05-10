const express = require('express');
const PlayerController = require('../controllers/PlayerControllers');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.post('/create', isAuth, PlayerController.createPlayer);

router.get('/getPastGames', isAuth, PlayerController.getPastGames);

router.put('/updateGame', isAuth, PlayerController.updateGame);

router.post('/logs', isAuth, PlayerController.gameStatusLogs);

module.exports = router;