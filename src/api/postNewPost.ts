import axios from "axios";
import {Posts} from "../types/postsType";

const postNewPost = async (
	text: string | undefined,
	name: string,
	postImage: string | null,
	avatar: string,
	isPending: boolean
): Promise<Posts> => {
	const responsePosts = await axios.post("https://1b6f506abeed4f2b.mokky.dev/posts", {
		text: text,
		name: name,
		postImage: postImage,
		avatar: avatar,
		isPending: isPending,
	});

	return responsePosts.data;
};

export default postNewPost;
