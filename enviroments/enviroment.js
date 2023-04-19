require('dotenv').config();

const PORT = process.argv.slice(2)[0] ?? 8080;
const mongoUrl = process.env.MONGO_URI;
const persistence = process.env.PERSISTENCE;
const emailService = process.env.EMAIL_SERVICE;
const emailPort = process.env.EMAIL_PORT;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailAdm = process.env.EMAIL_ADMIN;
const sidAccount = process.env.SID_ACCOUNT;
const authToken = process.env.AUTH_ACCOUNT;
const smsPhone = process.env.SMS_PHONE;
const wppNumber = process.env.WPP_NUMBER;

module.exports =  {mongoUrl, PORT, persistence, emailService,emailPort, emailUser, emailPass, emailAdm, sidAccount, authToken, smsPhone, wppNumber};
