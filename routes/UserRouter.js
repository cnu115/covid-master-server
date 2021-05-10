const express = require('express');
const User = require('../models/users');

const UserController = require('../controllers/UserController');

const router = express.Router();
const { check } = require('express-validator');
const isAuth = require('../middleware/is-auth')

// Featch all users

router.get('/all', isAuth, UserController.getUsers);

// Create user

router.post('/register', [ 
    check('email').isEmail().withMessage('Invalid E-mail'),
    check('name').isLength({ min: 1 }).withMessage('Please enter name'),
    check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
    check('email').custom(value => {
        return User.findOne({email: value }).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
    }),
    check('password').custom((value, { req }) => {
        if (value !== req.body.passwordConfirmation) {
          throw new Error('Password confirmation is incorrect');
        }else{
            return true
        }
    }),

], UserController.saveUsers)

router.post('/login', [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').not().isEmpty().withMessage('Please enter password'),

], UserController.login);


module.exports = router;