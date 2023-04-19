const nodemailer = require('nodemailer');
const { emailService, emailPort, emailUser } = require('../enviroments/enviroment');

const transporter = nodemailer.createTransport({
    service: emailService,
    port: Number(emailPort),
    auth: {
        user: emailUser,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (email) => {
    const infoEmail =  await transporter.sendMail({
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html
    });
    return infoEmail;
};

module.exports = {sendEmail};