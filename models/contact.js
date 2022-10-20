const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const contactSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const Contact = model("contact", contactSchema);

const postSchema = Joi.object({
	name: Joi.string().min(3).max(40).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "ua"] },
		})
		.required(),
	phone: Joi.string().min(10).max(13).required(),
	favorite: Joi.boolean().optional(),
});

const updateSchema = Joi.object({
	name: Joi.string().min(3).max(40),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net", "ua"] },
	}),
	phone: Joi.string().min(12).max(13),
	favorite: Joi.boolean().optional(),
}).min(1);

const favoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = {
	postSchema,
	updateSchema,
	favoriteSchema,
};

module.exports = { Contact, schemas };
