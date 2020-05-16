const nodemailer = require('nodemailer');


/*
 @Input: encrypted password, user email, user name
 @params
 @Output: status of new creation of a user 
*/
exports.handleEmailSend = async (req,res,getPassword) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_ID,
			pass: process.env.GMAIL_PASSWORD
    }
  })

  const mailOptions = {
		from: process.env.GMAIL_ID,
		to: req.body.email,
		subject: 'Welcome to Nutrition',
    html: `
      <body>
        <p> Hello ${req.body.name} </p>
        <br/>
        <p>Thank you for signin up to Nutrition Startup. Kindly use given credentials for loggin in.</p>
        <br/>
        <p>Email Id: ${req.body.email} </p>
        <p>Password: ${getPassword} </p>
        <br/>
        <br/>
        <p>Thank You!</p>
        <p>Nutrition Team</p>
      </body>
		`
	}
  
	transporter.sendMail(mailOptions, (err, info)=>{
		if(err){
			console.log('error occured',err);
			return;
    }
    
    
    return res.json({
      status: true,
      message: 'Restaurant Admin Created'
    });
	});
}