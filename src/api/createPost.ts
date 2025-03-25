import axios from "axios";
import {PostType} from "../types/postType";

const createPost = async (post: PostType): Promise<PostType> => {
	const responsePosts = await axios.post("https://1b6f506abeed4f2b.mokky.dev/posts", post, {
		headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
	});

	return responsePosts.data;
};

export default createPost;
