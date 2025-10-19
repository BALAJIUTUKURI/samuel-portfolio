const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Admin Login OTP - Samuel Paul Portfolio',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Admin Login OTP</h2>
        <p>Your OTP for admin login is:</p>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This OTP will expire in 5 minutes.</p>
        <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

const sendContactNotification = async (contactData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission - ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
            ${contactData.message}
          </div>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

const sendContactReply = async (contactData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: contactData.email,
    subject: 'Thank you for contacting Samuel Paul - Creative Designer',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
        <div style="background: white; border-radius: 15px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin: 0; font-size: 28px;">Thank You, ${contactData.name}!</h1>
            <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); margin: 15px auto; border-radius: 2px;"></div>
          </div>
          
          <div style="color: #666; line-height: 1.6; font-size: 16px;">
            <p>I've received your message and I'm excited to learn about your project! Here's what happens next:</p>
            
            <div style="background: #f8f9ff; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #333; margin-top: 0;">📋 Your Message:</h3>
              <p style="font-style: italic; color: #555;">${contactData.message}</p>
            </div>
            
            <div style="display: flex; gap: 20px; margin: 30px 0; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f0f8ff; border-radius: 10px;">
                <div style="font-size: 24px; margin-bottom: 10px;">⚡</div>
                <h4 style="color: #333; margin: 0;">Quick Response</h4>
                <p style="color: #666; font-size: 14px; margin: 5px 0;">I'll get back to you within 24 hours</p>
              </div>
              <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f0fff0; border-radius: 10px;">
                <div style="font-size: 24px; margin-bottom: 10px;">🎨</div>
                <h4 style="color: #333; margin: 0;">Creative Solutions</h4>
                <p style="color: #666; font-size: 14px; margin: 5px 0;">Tailored design concepts for your needs</p>
              </div>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul style="color: #666;">
              <li>📱 Check out my latest work on <a href="https://www.instagram.com/samuel_paul555/" style="color: #667eea; text-decoration: none;">Instagram</a></li>
              <li>💬 Connect with me on <a href="https://wa.me/919912226742" style="color: #667eea; text-decoration: none;">WhatsApp</a> for quick questions</li>
              <li>📞 Call me directly at <a href="tel:+919912226742" style="color: #667eea; text-decoration: none;">+91 99122 26742</a></li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
            <h3 style="color: #333; margin-bottom: 15px;">Let's Create Something Amazing Together!</h3>
            <div style="display: flex; justify-content: center; gap: 15px; margin: 20px 0;">
              <a href="https://wa.me/919912226742" style="display: inline-block; background: #25D366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: bold;">💬 WhatsApp</a>
              <a href="tel:+919912226742" style="display: inline-block; background: #667eea; color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: bold;">📞 Call Now</a>
            </div>
            
            <div style="color: #999; font-size: 14px; margin-top: 30px;">
              <p>Samuel Paul - Creative Graphic Designer</p>
              <p>📍 Hyderabad, India | 📧 Chandrapal.creative5@gmail.com</p>
              <p style="font-style: italic;">"Bringing your creative vision to life with professional design solutions"</p>
            </div>
          </div>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOTP, sendContactNotification, sendContactReply };