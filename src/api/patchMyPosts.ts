import axios from "axios";
import {Posts} from "../types/postsType";
import {UserData} from "../types/userDataType";

const patchMyPosts = async (
	userId: number,
	posts: Posts[] | undefined,
	newPost: Posts,
	token: string
): Promise<UserData> => {
	const response = await axios.patch(
		`https://1b6f506abeed4f2b.mokky.dev/users/${userId}`,
		{
			myPosts: posts ? [newPost, ...posts] : [newPost],
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	delete response.data.password;

	return response.data;
};

export default patchMyPosts;
