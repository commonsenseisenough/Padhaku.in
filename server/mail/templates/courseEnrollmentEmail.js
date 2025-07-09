exports.courseEnrollmentEmail = (courseName, name) => {
    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        padding: 20px;
                        color: #333;
                    }
                    .container {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: auto;
                    }
                    h1 {
                        color: #007bff;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to the ${courseName} course</h1>
                    <p>Hi ${name},</p>
                    <p>Congratulations! You have successfully enrolled in the <strong>${courseName}</strong> course.</p>
                    <p>We're excited to have you on board and look forward to helping you learn and grow.</p>
                    <br/>
                    <p>Regards,</p>
                    <p><strong>The Team</strong></p>
                </div>
            </body>
        </html>
    `;
};
