const { Contact } = require("../../models/contact");
const getAll = async (req, res) => {
	const contacts = await Contact.find();
	res.json({ message: "request success", data: contacts });
};

module.exports = getAll;
