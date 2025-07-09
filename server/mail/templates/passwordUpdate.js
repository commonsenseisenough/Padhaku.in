exports.passwordUpdate = (email, name) => {
    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                        color: #333;
                    }
                    .container {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                        max-width: 600px;
                        margin: auto;
                    }
                    h1 {
                        color: #e63946;
                    }
                    p {
                        line-height: 1.6;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hi ${name},</h1>
                    <p>Your password has been <strong>updated successfully</strong>.</p>
                    <br />
                    <p>Thanks,</p>
                    <p><strong>The Team</strong></p>
                </div>
            </body>
        </html>
    `;
};
