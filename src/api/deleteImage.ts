import axios from "axios";
import {ImagePostType} from "../types/imagePostType";

const deleteImage = async (imageId: ImagePostType["id"]) => {
	await axios.delete(`https://1b6f506abeed4f2b.mokky.dev/uploads/${imageId}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};

export default deleteImage;
