const express= require('express');

const router= express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/is-auth');

router.get('/signUp',UserController.getSignUp);

router.post('/signUp',UserController.postSignUp);

router.get('/login',UserController.getLogin);

router.post('/login',UserController.postLogin);

router.post('/logout',UserController.postLogOut);

router.get('/reset',UserController.getReset);





module.exports= router;