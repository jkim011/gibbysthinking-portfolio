const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'jaredkim011@gmail.com',
        pass: process.env.REACT_APP_PASS
      }
    });

    const { name, email, subject, message } = req.body;

    let mailOptions = {
      from: email,
      to: 'jaredkim011@gmail.com',
      subject:`From ${name}: ${subject}`,
      text: message,
      html:`
             <p>${message}</p> <br/>
             <p>Sent from ${email} via portfolio contact form.</p>
           `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Message sent: ' + info.messageId);
    });
  } catch (error) {
    res.json({status: error})
  }
}


module.exports = { sendEmail }