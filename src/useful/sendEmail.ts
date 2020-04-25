const nodemailer = require('nodemailer');

const myEmail = 'admin@connecting-for-change.ca';

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: "587",
    auth: {
        user: myEmail,
        pass: 'DaxtonIsPoopyPantsJKHe420AllDay'
    }
});

const sendEmail = async (to: string, subject: string, body: string, html: string) => {
    await transporter.sendMail({ from: myEmail, to: to, subject: subject, text: body }, function (error: boolean, info: {response: string}) {
        if (error) throw "Failed to send email."
    });
}

module.exports = sendEmail;