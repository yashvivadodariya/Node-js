const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "yashvivadodariya72@gmail.com",
        pass: "mgmxfbbmhlazoqvf"
    }
});

const sendWelcomeMail = async (email, firstName, password, role) => {
    const mailOptions = {
        from: "yashvivadodariya72@gmail.com",
        to: email,
        subject: "Welcome to Employee Management System - Your Login Credentials",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333;">Welcome, ${firstName}!</h2>
                <p>You have been registered as a <strong>${role}</strong> in the Employee Management System.</p>
                <hr />
                <h3>Your Login Credentials:</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Password:</strong> ${password}</p>
                <hr />
                <p style="color: #888; font-size: 12px;">Please change your password after your first login for security purposes.</p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendWelcomeMail;


//mgmx fbbm hlaz oqvf