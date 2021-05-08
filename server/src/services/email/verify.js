const sendMail = require("./core");
const generateVerificationToken = require("../../middlewares/generateVerificationToken");

module.exports = async function verifyEmail({ id, name, email, callback }) {
  const token = generateVerificationToken(id);
  const link = `http://localhost:3000/verificar/${token}`;

  let to = email;
  let subject = "Verificação de Email";
  let html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
      <title>Spital E-mail Verfication</title>
      <style>
        :root {
          font-size: 60%;
        }
  
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
  
        html,
        body {
          height: 100vh;
          background-color: #fff;
        }
  
        body,
        input,
        button,
        textarea {
          font: 500 1.6rem "Quicksand";
        }
  
        a {
          text-decoration: none;
        }
  
        li {
          list-style: none;
        }
  
        header {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          width: 100vw;
          background-color: rgba(7, 179, 214, 0.7);
        }
  
        header a {
          color: #fff;
          font-size: 3.5rem;
          font-weight: bold;
        }
  
        main {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 80vw;
          padding: 2rem;
        }
  
        .p1 {
          display: block;
          width: 70%;
          font-size: 1rem;
          text-align: left;
          margin-top: 2rem;
        }
  
        #p1-new {
          width: 100%;
        }
  
        .p2 {
          display: block;
          width: 70%;
          font-size: 1rem;
          margin-left: 25%;
          margin-top: 3rem;
          font-weight: 100;
        }
  
        .subtitle {
          text-transform: uppercase;
          margin-top: 3rem;
          font-size: 1.5rem;
          font-weight: bold;
          color: #8f2d56;
        }
  
        .button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #3EB713;
          color: #fff;
          font-weight: bold;
          font-size: 3rem;
          border-radius: 3rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
  
        @media (max-width: 1250px) {
          .p1 {
            display: block;
            width: 70%;
            font-size: 2rem;
            text-align: left;
            margin-top: 2rem;
          }
  
          .p2 {
            display: block;
            width: 70%;
            font-size: 2rem;
            margin-left: 25%;
            margin-top: 3rem;
            font-weight: 100;
          }
        }
      </style>
    </head>
    <body>
      <header>
        <a href="http://localhost:3000/">Spital</a>
      </header>
  
      <main>
        <p class="p1">
          Olá <b>${name}!</b> Após o cadastro, precisamos que você clique no
          botão abaixo para confirmarmos seu e-mail.
        </p>
        <p class="p2">
          Após a verificação, você será redirecionado para o website e poderá
          logar sem maiores problemas.
        </p>
        <p class="subtitle">Caso não tenha sido você:</p>
        <p class="p1" id="p1-new">
          Sua conta de e-mail
          <span style="font-weight: bold; color: #f00"
            >pode estar comprometida</span
          >
          e é necessário que não clique no botão de verificação!
        </p>
      </main>
      <a class="button" href="${link}">Verificar E-mail</a>
    </body>
  </html>
  
    
    `;

  await sendMail({
    to,
    subject,
    html,
    callback,
  });
};
