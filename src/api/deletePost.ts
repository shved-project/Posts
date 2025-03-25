import axios from "axios";
import deleteImage from "./deleteImage";
import {ImagePostType} from "../types/imagePostType";
import {PostType} from "../types/postType";

const deletePost = async (postId: PostType["id"], imageId?: ImagePostType["id"]) => {
	if (imageId) {
		await Promise.all([
			deleteImage(imageId),
			axios.delete(`https://1b6f506abeed4f2b.mokky.dev/posts/${postId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}),
		]);
	} else {
		await axios.delete(`https://1b6f506abeed4f2b.mokky.dev/posts/${postId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
	}
};

export default deletePost;
