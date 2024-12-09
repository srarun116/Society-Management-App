const express = require("express");
const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const forgetPassword = require("../controllers/forgetPassword");
const verifyOtp = require("../controllers/verifyOtp");
const getOtpTime = require("../controllers/getOtpTime");
const getAccess = require("../controllers/getAccess");
const updatePassword = require("../controllers/passwordUpdate");
const { addGuard } = require("../controllers/addGuardControoler");
const { guardLogin } = require('../controllers/securityGuardController');
const { residentLogin } = require('../controllers/residentController');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forget/password", forgetPassword);
router.post("/verify/otp" , verifyOtp);
router.post("/otp/time", getOtpTime);
router.post("/get/access", getAccess);
router.post("/password/update", updatePassword);
router.post('/add-guard', addGuard);
router.post('/guard-login', guardLogin);
router.post('/resident-login', residentLogin);

module.exports = router;