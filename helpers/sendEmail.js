const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SEND_GRID_API_KEY } = process.env;
sgMail.setApiKey(SEND_GRID_API_KEY);

// --------------------------
const sendEmail = async () => {
  const email = {
    to: "hatovoy428@etondy.com", // Change to your recipient
    from: "zlatta2000@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  await sgMail
    .send(email)
    .then((response) => {
      console.log("Email send", response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error("error", error.message);
    });
};
module.exports = sendEmail;
