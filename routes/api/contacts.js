const express = require("express");

const ctrl = require("../../controllers/contacts");

const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
	"/",
	authenticate,
	validateBody(schemas.postSchema),
	ctrlWrapper(ctrl.add)
);

router.put(
	"/:contactId",
	authenticate,
	isValidId,
	validateBody(schemas.updateSchema),
	ctrlWrapper(ctrl.updateById)
);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidId,
	validateBody(schemas.favoriteSchema),
	ctrlWrapper(ctrl.updateStatusContact)
);

router.delete(
	"/:contactId",
	authenticate,
	isValidId,
	ctrlWrapper(ctrl.deleteById)
);

module.exports = router;
