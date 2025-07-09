const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try{

        // Create a transporter object using SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, 
            auth:{
                user: process.env.MAIL_USER, // Your email address
                pass: process.env.MAIL_PASS, // Your email password
            }
        });
        // Set up email data
        let info=await transporter.sendMail({
            from: 'ᴘᴀᴅʜᴀᴋᴜ.ɪɴ by Purshottam', // Sender address
            to: `${email}`, // List of recipients
            subject: `${title}`, // Subject line
            text:`${body}` , // Plain text body
        });
        console.log('Email sent successfully:-> ', info);
        return info;
        


            

    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}

module.exports = mailSender;