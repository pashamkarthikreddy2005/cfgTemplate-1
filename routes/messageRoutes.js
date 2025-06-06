const sendMail = require("../utils/mailer");
const sms = require("../utils/sms");

const router = require("express").Router();

router.post("/mail", sendMail);
router.get("/otp", sms.sendOTP);
router.get('/sms', sms.sendMessage);

module.exports = router;
