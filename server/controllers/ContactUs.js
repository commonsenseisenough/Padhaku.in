const mailSender = require('../utils/mailSender');

// Contact Us Controller
exports.ContactUs = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo, message } = req.body;

        if (!firstName || !lastName || !email || !phoneNo || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Body for admin mail
        const adminBody = `
New Contact Us Query:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phoneNo}
Message: ${message}
        `;

        // Send to admin
        await mailSender("vidyasagarpurshottam@gmail.com", "New Contact Us Query", adminBody);

        // Send acknowledgment to user
        const userBody = `Hi ${firstName},

Thank you for contacting us! We have received your message and will respond soon.

Your Message:
"${message}"

- ᴘᴀᴅʜᴀᴋᴜ.ɪɴ Team`;

        await mailSender(email, "Thanks for contacting ᴘᴀᴅʜᴀᴋᴜ.ɪɴ", userBody);

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
        });

    } catch (error) {
        console.error("Error in ContactUs:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error.message,
        });
    }
};
