function verificationCode(username, verifyCode) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verification Code</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; margin: 0;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
      <h2 style="text-align: center; color: #1e202c;">Hello, ${username}!</h2>
      <p style="text-align: center; font-size: 16px; color: #555;">Your verification code is:</p>
      <div style="background: #f8f9fa; border: 1px dashed #1e202c; color: #1e202c; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 4px; padding: 15px; margin: 20px 0; border-radius: 6px;">
        ${verifyCode}
      </div>
      <p style="font-size: 13px; color: #777; text-align: center;">Please keep this code secure and do not share it with anyone.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />
      <p style="text-align: center; font-size: 12px; color: #999;">Picsee Team &bull; All rights reserved.</p>
    </div>
  </body>
</html>`;
}

function resetPassword(username, token, redirectToLink) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f6f6;
        color: #303030;
        margin: 0;
        padding: 20px 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
      }
      .header {
        background-color: #1e202c;
        color: white;
        padding: 24px;
        text-align: center;
      }
      .content {
        padding: 30px;
      }
      .content p {
        font-size: 16px;
        line-height: 1.6;
        color: #444;
      }
      .button {
        display: block;
        padding: 14px 24px;
        margin: 28px 0;
        text-align: center;
        box-sizing: border-box;
        width: 100%;
        background-color: #1e202c;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        font-size: 16px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #888;
        background-color: #fafafa;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2 style="margin: 0;">Reset Your Password</h2>
      </div>
      <div class="content">
        <p>Hello ${username},</p>
        <p>
          We received a request to reset your password for your Picsee account. Click the button below to choose a new password:
        </p>
        <a href="${redirectToLink}?t=${token}" class="button">Reset Password</a>
        <p style="font-size: 14px; color: #777;">
          If you did not make this request, you can safely ignore this email and your password will remain unchanged.
        </p>
        <p>Best regards,<br/><strong>The Picsee Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; Picsee. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;
}

module.exports = {
  resetPassword,
  verificationCode,
};