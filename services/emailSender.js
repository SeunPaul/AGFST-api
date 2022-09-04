const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const {
  // EMAIL_PASS, EMAIL_USER, EMAIL_HOST, EMAIL_PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN
} = require("../config/env_variables");

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail({ to, subject, html }) {
  const accessToken = await oAuth2Client.getAccessToken();

  console.log("send mail !!!!!!!!!!");

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "seunpaul148@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken
    }
  });

  const info2 = await transport.sendMail({
    from: "seunpaul148@gmail.com",
    to,
    subject,
    html
  });

  return info2;
}

module.exports = { sendMail };
