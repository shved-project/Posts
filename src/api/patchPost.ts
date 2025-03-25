import axios from "axios";
import {ImagePostType} from "../types/imagePostType";
import {PostType} from "../types/postType";

const patchPost = async (postId: PostType["id"], postText: PostType["text"], imagePost: ImagePostType | null) => {
	const responsePatch = await axios.patch(
		`https://1b6f506abeed4f2b.mokky.dev/posts/${postId}`,
		{
			text: postText,
			postImage: imagePost,
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);

	return responsePatch.data;
};

export default patchPost;
