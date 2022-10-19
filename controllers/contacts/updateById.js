const { Contact } = require("../../models/contact");

const RequestError = require("../../helpers/RequestError");

const updateById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!contact) {
		throw RequestError(404, "Not found");
	}
	res.json({ message: "contact updated", data: contact });
};

module.exports = updateById;
