const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
	const { _id } = req.user;
	const { path: tempName, originalname } = req.file;
	const extension = originalname.split(".").pop();
	const fileName = `${_id}.${extension}`;
	const resultUpload = path.join(avatarsDir, fileName);
	await fs.rename(tempName, resultUpload);
	const resizedAvatar = await Jimp.read(resultUpload);
	await resizedAvatar.resize(250, 250).write(resultUpload);
	const avatarURL = path.join("/avatars", fileName);
	await User.findByIdAndUpdate(_id, { avatarURL });
	res.json({
		avatarURL,
	});
};

module.exports = updateAvatar;
