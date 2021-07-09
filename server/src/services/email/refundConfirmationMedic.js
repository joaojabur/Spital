const sendMail = require("./core");

module.exports = async function refundConfirmationMedic({
  email,
  callback,
  appointment,
  time,
}) {
  const [month, day, year] = appointment.date.split("/");
  let to = email;
  let subject = "Consulta agendada";
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
      <title>Spital - Consulta agendada</title>
    </head>
    <body
      style="
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Quicksand;
      "
    >
      <table width="600" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td
            style="
              padding: 15px 0 15px 0;
              color: white;
              font-size: 30px;
              font-weight: bold;
            "
            bgcolor="#24daff"
            align="center"
          >
            <a
              style="text-decoration: none; color: #fff"
              href="https://medico.spital.com.br/principal"
              >Spital</a
            >
          </td>
        </tr>
  
        <tr>
          <td
            style="
              font-size: 2rem;
              color: #f00;
              font-weight: bold;
              padding: 1rem 0 0 0;
            "
            align="center"
          >
            Consulta cancelada...
          </td>
        </tr>
  
        <tr style="margin-top: 40px">
          <td
            style="
              font-size: 1.2rem;
              color: #333;
              font-weight: bold;
              padding: 2rem 2rem 1rem 2rem;
            "
            align="center"
          >
            ${time} horas do dia ${day}/${month}/${year} está livre em sua agenda!
          </td>
        </tr>
  
        <tr align="center">
          <td>
            <a
              href="https://medico.spital.com.br/agenda"
              style="
                margin: 20px auto 0 auto;
                background-color: #07b3d6;
                color: #fff;
                display: block;
                width: 500px;
                height: 30px;
                font-size: 20px;
                padding: 10px;
                border-radius: 30px;
                text-decoration: none;
                font-weight: bold;
              "
              >Ver na plataforma</a
            >
          </td>
        </tr>
      </table>
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
