const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const resendVerificationEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw RequestError(404, "User not found");
	}
	if (user.verify) {
		throw RequestError(400, "Verification has already been passed");
	}
	await sendEmail(email, user.verificationToken);
	res.json({
		message: "Verification email sent",
	});
};

module.exports = resendVerificationEmail;
