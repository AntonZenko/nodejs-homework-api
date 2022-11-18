const signUp = require("./signUp");
const verify = require("./verify");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const resendVerificationEmail = require("./resendVerificationEmail");

module.exports = {
	signUp,
	verify,
	resendVerificationEmail,
	login,
	getCurrent,
	logout,
	updateAvatar,
};
