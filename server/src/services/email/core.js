const transporter = require('./config');
require("dotenv").config({ path: "./src/.env" });

module.exports = async function sendMail({ to, subject, html, callback}){
    /**
     * @param {string} to Receiver
     * @param {string} subject Subject
     * @param {string} text Text
     */
    let mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject,
        html
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    });
}