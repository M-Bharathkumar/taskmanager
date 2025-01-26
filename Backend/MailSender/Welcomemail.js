var nm = require("nodemailer");


var trans = nm.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: "mittapallibharathkumar2005@gmail.com",
    pass: "kmnbisrgbyoqonyu",
  },
  port: 465,
  secure: true,

  connectionTimeout: 10000,
  greetingTimeout: 10000,
});

const sendMail = (to, subject, text) => {
  const mailOpt = {
    from: "your_email@gmail.com", // Replace with your Gmail
    to,
    subject,
    text,
  };

  return trans.sendMail(mailOpt);
};

module.exports = sendMail;

trans.sendMail(mailOpt, function (err, info) {
  if (err) {
    console.error("Error in sending mail: ", err);
  } else {
    console.log("Email sent successfully: ", info.response);
  }
});