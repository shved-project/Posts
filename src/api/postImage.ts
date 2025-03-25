import axios from "axios";
import {ImagePostType} from "../types/imagePostType";

const postImage = async (imagePost: File): Promise<ImagePostType> => {
	const formDataImage = new FormData();
	formDataImage.append("file", imagePost);

	const responseUploads = await axios.post("https://1b6f506abeed4f2b.mokky.dev/uploads", formDataImage, {
		headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
	});

	return {url: responseUploads.data.url, fileName: responseUploads.data.fileName, id: responseUploads.data.id};
};

export default postImage;
