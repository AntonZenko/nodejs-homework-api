const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { BASE_URL } = process.env;

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
	const mail = {
		to: email,
		subject: "Verify your email",
		html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
		from: "antonzenko92@gmail.com",
	};

	await sgMail
		.send(mail)
		.then(() => console.log("Email send successfully"))
		.catch((err) => console.log(err.message));
	return true;
};

module.exports = sendEmail;
