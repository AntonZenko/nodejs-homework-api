const Joi = require("joi");

const postSchema = Joi.object({
	name: Joi.string().min(3).max(40).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "ua"] },
		})
		.required(),
	phone: Joi.string().min(10).max(13).required(),
});
const updateSchema = Joi.object({
	name: Joi.string().min(3).max(40),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net", "ua"] },
	}),
	phone: Joi.string().min(12).max(13),
}).min(1);

module.exports = {
	postSchema,
	updateSchema,
};
