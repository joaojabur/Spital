const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_USER,
  },
});

let mailOptions = {
  from: "suportespital@gmail.com",
  to: "joaozito0205@gmail.com",
  subject: "Testing and Testing",
  html: `
    <html>
        <head>
            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                h1 {
                    font-size: 2rem;
                    font-weith: bold;
                }
            </style>
        </head>

        <body>s
            <h1>Welcome to Spital!</h1>
        </body>
    </html>
  `,
};

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("E-mail sent!");
  }
});
