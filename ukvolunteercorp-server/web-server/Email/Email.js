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
    from: '"covimeds" <covimeds.support.team@binarytradingoptions.org>', // sender address
    to: user.email, // list of receivers
    subject: `Welcome to covimeds - Your Health, Our Priority!`, // Subject line
    // text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0;">
    
    <div style="background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); text-align: left; max-width: 600px; margin: 20px auto;">
        <h2>Welcome to covimeds! 🌟</h2>
        <p style="font-size: 18px; margin-bottom: 20px;">Hello ${user.fullName},</p>
     <p>
    
    
    
    We're thrilled you've joined us on your health journey. If you have any questions or need assistance, simply reply to this email. Your well-being is our top priority!
    
     </p>
    
    
     <p>
      Best regards, <br />
      covimeds Team
    
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






function OrderEmail(user) {

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
    from: '"covimeds" <covimeds.support.team@binarytradingoptions.org>', // sender address
    to: user.email, // list of receivers
    subject: `Important Information About Your Recent Order - Payment and Delivery Details`, // Subject line
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
 <p>
Thanks for your valuable Order with us. <br />
Hope you and your loved ones are safe from covi-19.<br />

We accept payment via PAYPAL <br />

Before you make Payment, we would like to clarify the following.<br /><br />
1). (Please do not describe any medicine name during payment or afterward as PayPal doesn't allow the medicinal transaction.)<br /><br />
2). Send payments as “Family and Friends”<br /><br />
3). We will be able to ship your order within 1-2 days after confirmation of your payment.<br /><br />
4). There might be a little bit of delay in order delivery due to low flight frequency.<br /><br />
5). If PayPal contacts you in the future, tell them you have purchased Clothes products Only.<br /><br />
6). Estimated delivery time is around 2-3 Weeks.<br /><br />
 
<br />
PayPal Info;<br />
${process.env.PAYPAL_NAME} <br />

${process.env.PAYPAL_ADDRESS}<br />

<br />

Remember! We Offer: 100% Satisfaction Guarantee. (If somehow your package is Delayed or not delivered, Then we can reship your package or refund your full payment).<br />


 </p>


 <p>
  Best regards, <br />
  covimeds Team
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

exports.OrderEmail = OrderEmail;