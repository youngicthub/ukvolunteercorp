const nodemailer = require("nodemailer");
const fs = require("fs");
// Sending emails


function WelcomeEmail(user) {

  let transporter = nodemailer.createTransport({
    host: "mail.assetbloomaxis.com",
    name: "assetbloomaxis.com",
    pool: true,
    port: 587, //<----change
    secure: false,
    auth: {
      user: "covimeds.support.team@binarytradingoptions.org", // generated ethereal user
      pass: "zSnD74R9rMQH", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"UK Volunteer Corp" <covimeds.support.team@binarytradingoptions.org>', // sender address
    to: user.email, // list of receivers
    subject: `A Heartfelt Thank You for Your Generous Donation! 🌟`, // Subject line
    // text: "Hello world?", // plain text body
    html: `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0;">
    
    <div style="background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); text-align: left; max-width: 600px; margin: 20px auto;">
        <h2>🌟 Welcome to our Community of Generosity! 🌟</h2>
        <p style="font-size: 18px; margin-bottom: 20px;">Dear ${user.firstname},</p>
     <p>
        A heartfelt thank you for joining us in making a difference!

<br />
<br />
    
    
        Your generosity has the power to transform lives, and we are truly grateful for your donation. With every contribution, you are helping us achieve our mission and bring positive change to those in need.

<br />
<br />

Together, we are building a brighter future and creating a ripple effect of kindness. Your support fuels our efforts and inspires others to join this compassionate journey.
<br />
<br />
Once again, thank you for your kindness and generosity. We couldn't do it without amazing donors like you.

<br />
<br />
Welcome to our community, where every act of kindness counts!

<br />
<br />








     </p>
    
    
     <p>
     With gratitude,, <br />
      UK Volunteer Corp.
    
     </p>
    </div>
    
    </body>
    </html>
    
        
    


    
    `, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("Email has been sent");

  });

  return transporter;
}

exports.WelcomeEmail = WelcomeEmail;




