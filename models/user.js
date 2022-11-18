const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const emailRegexp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			match: emailRegexp,
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: "",
		},
		avatarURL: {
			type: String,
			required: [true, "Avatar is required"],
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

const signUpSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const verifyEmailSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
	signUpSchema,
	loginSchema,
	verifyEmailSchema,
};

module.exports = {
	User,
	schemas,
};
