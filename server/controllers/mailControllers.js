const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: '@gmail.com',
            pass: ''
        }
    });

    const { name, email, subject, message } = req.body;

    let mailOptions = {
        from: email,
        to: '@gmail.com',
        subject:`From ${name}: ${subject}`,
        text: message,
        html: `<p>${message}</p>`
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