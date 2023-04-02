const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: procces.env.EMAIL_USER
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