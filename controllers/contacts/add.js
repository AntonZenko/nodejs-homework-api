const { Contact } = require("../../models/contact");

const add = async (req, res) => {
	const newContact = await Contact.create(req.body);
	return res.status(201).json({ message: "contact added", data: newContact });
};

module.exports = add;
