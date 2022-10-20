const express = require("express");

const ctrl = require("../../controllers/contacts");

const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { isValidId, validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.postSchema), ctrlWrapper(ctrl.add));

router.put(
	"/:contactId",
	isValidId,
	validateBody(schemas.updateSchema),
	ctrlWrapper(ctrl.updateById)
);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateBody(schemas.favoriteSchema),
	ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
