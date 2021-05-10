const Players = require('../models/players');
let logger = require('logger').createLogger('development.log'); // logs to a file

// const Users = require('../models/users');


// var ObjectId = require('mongoose').Types.ObjectId; 

exports.gameStatusLogs = (req, res, next) => {

    const action_type = req.body.action_type

    logger.info(`${req.userId} Action `, action_type);

    res.status(200).json({
        status: "SUCCESS",
    })
}

exports.createPlayer = (req, res, next) => {
    // console.log(req)
    const players = new Players({
        gameStatus: null,
        StartTime : Date.now(),
        EndTime : null,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        userId: req.id
    })

    players.save().then(results => {
        res.status(200).json({
            status: "SUCCESS",
            results: players
        })
    }).catch(err => {
        next(err);
    })
}

exports.getPastGames = (req, res, next) => {
    Players.find({userId: req.id}).find({gameStatus: {$ne: null}}).sort('-createdAt').then(results => {
        res.status(200).json({
            status: "SUCCESS",
            results: results
        })
        // logger.info(`${req.userId} Past games`, results);

    }).catch(err => {
        next(err);
    })
}

exports.updateGame = (req, res, next) => {
    console.log(req.body);
    Players.findById(req.body.id).then(game => {

        if(!game) {
            const error = new Error('Could not find game.');
            error.statusCode = 404;
            throw error;
        }
        let gameStatus = req.body.gameStatus;
        if(gameStatus){
            gameStatus = "Win"
        }else{
            gameStatus = "Lost"
        }

        game.EndTime = Date.now();
        game.gameStatus = gameStatus;
        game.save();

        logger.info(`${req.userId} Win Status `, gameStatus);

        res.status(200).json({
            status: "SUCCESS",
            // results: results
        })
    }).catch(err => {
        next(err);
    })
}