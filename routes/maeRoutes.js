const express = require('express');
const router = express.Router();
const maeController = require('../controllers/maeController');

router.post('/maes', maeController.criarMae);
router.post('/maes/login', maeController.loginMae);
router.get('/maes', maeController.listarMaes);

module.exports = router;