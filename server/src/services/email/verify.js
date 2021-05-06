const sendMail = require('./core');
const generateVerificationToken = require('../../middlewares/generateVerificationToken');

module.exports = async function verifyEmail({ id, name, email, callback}){
    const token = generateVerificationToken(id);
    const link = `http://localhost:3000/verificar/${token}`;

    let to = email;
    let subject =  "Verificação de Email";
    let html = `
        Isso será enviado para ${name}
        <a href="${link}>${link}<a/>
    `
    
    await sendMail({
        to,
        subject,
        html,
        callback
    });
}