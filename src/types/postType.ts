import {ImagePostType} from "./imagePostType";

export type PostType = {
	id: number | string;
	user_id: number;
	text: string | undefined;
	name: string;
	postImage: ImagePostType | null;
	avatar: string;
	isPending: boolean;
};
