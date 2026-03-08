const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.post('/login', adminController.loginAdmin);
router.get('/logs', adminController.listarLogs);
router.post('/banir-ip', adminController.banirIP);
router.post('/banir-mae', adminController.banirMae);
router.post('/banir-filho', adminController.banirFilho);

module.exports = router;
