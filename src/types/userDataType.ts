import {Posts} from "./postsType";

export type UserData = {
	firstName: string;
	lastName: string;
	email: string;
	id: number;
	avatar: string;
	myPosts?: Posts[];
};
