import axios from "axios";

const postImage = async (imagePost: File): Promise<string> => {
	const formDataImage = new FormData();
	formDataImage.append("file", imagePost);

	const responseUploads = await axios.post("https://1b6f506abeed4f2b.mokky.dev/uploads", formDataImage);

	return responseUploads.data.url;
};

export default postImage;
