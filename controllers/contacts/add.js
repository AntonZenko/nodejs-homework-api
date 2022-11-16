const { Contact } = require("../../models/contact");

const add = async (req, res) => {
	const { _id: owner } = req.user;
	const newContact = await Contact.create({ ...req.body, owner });
	return res.status(201).json({ message: "contact added", data: newContact });
};

module.exports = add;
