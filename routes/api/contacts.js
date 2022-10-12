const express = require("express");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const { postSchema, updateSchema } = require("../../helpers/ValidateSchemas");

const RequestError = require("../../helpers/RequestError");
const { nanoid } = require("nanoid");

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const contacts = await listContacts();
		res.json({ message: "request success", data: contacts });
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);
		if (!contact) {
			throw RequestError(404, "Not found");
		}
		res.json({ message: "request success", data: contact });
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error, value: body } = postSchema.validate(req.body);
		if (error) {
			const [details] = error.details;
			return res.status(400).json({ message: details.message });
		}
		const newContact = { id: nanoid(), ...body };
		await addContact(newContact);

		return res.status(201).json({ message: "contact added", data: newContact });
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await removeContact(contactId);
		if (!contact) {
			throw RequestError(404, "Not found");
		}
		res.json({ message: "contact deleted", data: contact });
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = updateSchema.validate(req.body);
		if (error) {
			throw RequestError(400, "missing fields");
		}
		const { contactId } = req.params;
		const contact = await updateContact(contactId, req.body);
		if (!contact) {
			throw RequestError(404, "Not found");
		}
		res.json({ message: "contact updated", data: contact });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
