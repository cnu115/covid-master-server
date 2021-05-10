const Users = require('../models/users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');


exports.getUsers = function (req, res, next) {
    Users.find().select('_id name email').then(results => {
        return res.status(200).json({
            code: 200,
            status: "SUCCESS",
            results: results
        })
    });
}

exports.saveUsers = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json(errors.array())
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // encrypting the password
    bcrypt.hash(password, 12).then(hashPassword => {
        console.log(hashPassword)
        const user = new Users({
            name: name,
            email: email,
            password: hashPassword
        })
        return user.save();
    }).then(results => {
        return res.status(201).json({
            code: 201,
            status: "SUCCESS",
            message: 'Account Successfully Registred',
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.login = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
    }
    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({ email: email }).then(user => {
        console.log(user);
        if (!user) {
            return res.status(401).json({
                code: 401,
                status: "FAILED",
                message: "E-mail address not found"
            })
        } else {
            bcrypt.compare(password, user.password).then(isEqual => {
                console.log(isEqual)
                if (isEqual) {
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.cookie('token', token, { maxAge: 900000, path: '/', httpOnly: true });
                    res.status(200).json({
                        code: 200,
                        status: "SUCCESS",
                        message: 'login successfull',
                        results: {
                            // id: user._id,
                            email: user.email,
                            name: user.name
                        },
                        token: token
                    })
                } else {
                    res.status(401).json({
                        code: 401,
                        status: "FAILED",
                        message: 'Invalid Email or Password',
                    })
                }
            })

        }
    }).catch(err => {
        console.log(err)
    })

    // res.send('working');
}

