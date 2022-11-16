const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 10, ...filter } = req.query;
	const skip = (page - 1) * limit;
	const contacts = await Contact.find(
		{ owner, ...filter },
		"-createdAt -updatedAt",
		{ skip, limit }
	).populate("owner", "email subscription");
	res.json({ message: "request success", data: contacts });
};

module.exports = getAll;
