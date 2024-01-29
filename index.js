const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors=require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/submit', async (req, res) => {
  try {
    const { name, email } = req.body;
    await sendAutomationEmail(name,email);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function sendAutomationEmail(name,email) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth:{
        user: "aksrahangdale@gmail.com",
        pass: "PSvWBwcqyKkU3sId"
    }


  });

  const mailOptions = {
    from: 'aksrahangdale@gmail.com',
    to: email,
    subject: "Thanks for Subscribing  "+ name,
    text: "Thanks for subscribing! "+ name,
  };

  await transporter.sendMail(mailOptions);
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
