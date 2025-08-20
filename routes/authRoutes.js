const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');

router.post('/register', authController.register); //JWT

router.post('/login', authController.login); //JWT

router.post('/logout', authController.logout);

router.get('/me', authController.getProfile); //profil

module.exports = router;