const { createTransport } = require("nodemailer");

class NodeEmailService {
  static getConfigs() {
    return {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD_EMAIL,
      },
    };
  }

  static async sendEmail(email, subject, bodyHtml) {
    const transporter = createTransport(this.getConfigs());
    try {
      await transporter.sendMail({
        from: process.env.APP_EMAIL || "noreply@picsee.app",
        to: email,
        subject,
        html: bodyHtml,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }
}

module.exports = {
  NodeEmailService,
};