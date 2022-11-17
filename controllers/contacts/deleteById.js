const { Contact } = require("../../models/contact");

const { RequestError } = require("../../helpers");

const deleteById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findByIdAndRemove(contactId);
	if (!contact) {
		throw RequestError(404, "Not found");
	}
	res.json({ message: "contact deleted", data: contact });
};

module.exports = deleteById;
