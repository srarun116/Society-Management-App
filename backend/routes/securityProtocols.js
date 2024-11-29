const express = require('express');
const router = express.Router();
const {createSecurityProtocol, getAllSecurityProtocols, updateSecurityProtocol, deleteSecurityProtocol} = require('../controllers/securityProtocolController');


router.post('/',  createSecurityProtocol);
router.get('/',  getAllSecurityProtocols);
router.put('/:id', updateSecurityProtocol);
router.delete('/:id',  deleteSecurityProtocol);

module.exports = router;
