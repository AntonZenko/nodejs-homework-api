const { Contact } = require("../../models/contact");

const RequestError = require("../../helpers/RequestError");

const getById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findById(contactId);
	if (!contact) {
		throw RequestError(404, "Not found");
	}
	res.json({ message: "request success", data: contact });
};

module.exports = getById;
