const express = require('express');
const router = express.Router();
const filhoController = require('../controllers/filhoController');

router.post('/filhos', filhoController.criarFilho);
router.post('/filhos/login', filhoController.loginFilho);
router.get('/filhos/mae/:maeId', filhoController.listarFilhosPorMae);

module.exports = router;