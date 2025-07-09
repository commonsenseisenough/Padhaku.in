const otpTemplate = (otp) => {
    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                        padding: 20px;
                        color: #333;
                    }
                    .container {
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: auto;
                        text-align: center;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #007bff;
                        letter-spacing: 4px;
                        margin: 20px 0;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Your OTP Code</h2>
                    <p>Please use the following OTP to verify your action:</p>
                    <div class="otp">${otp}</div>
                    <p>This OTP is valid for only a few minutes. Do not share it with anyone.</p>
                    <br />
                    <p>Thanks,</p>
                    <p><strong>The Team</strong></p>
                </div>
            </body>
        </html>
    `;
};

module.exports = { otpTemplate };
