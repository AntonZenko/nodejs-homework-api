const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) =>
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
	const result = await fs.readFile(contactsPath);
	return JSON.parse(result);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contactById = contacts.find((contact) => contact.id === contactId);
	return contactById || null;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await updateContacts(contacts);
	return result;
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContactsList = [...contacts, body];
	await updateContacts(newContactsList);
	return body;
};

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	contacts[index] = { ...contacts[index], ...body };
	await updateContacts(contacts);
	return contacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
