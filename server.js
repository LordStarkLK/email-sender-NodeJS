const express = require('express');
const bodyParser = require('body-parser');
const exphb = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();


//view engine setup

app.engine('handlebars', exphb.engine());
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json);

//static folder
app.use('/public', express.static(path.join(__dirname,'public')));

app.get('/',(req,res) => {
    res.render('contact');
});

app.post('/send', async (req,res) => {
    const output = `
    <p>You have a bew contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    `;
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 993,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'batuwangalapivithuru@gmail.com', // generated ethereal user
        pass: 'Batmanisme#2017', // generated ethereal password
      },
      tls:{
        rejectUnauthorized: false,
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <batuwangalapivithuru@gmail.com>', // sender address
      to: "geforcegtx1650yt@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res,render('contact', {msg:'Email has sent'})
  
})

app.listen(3000, ()=>console.log(' Server Started....'));