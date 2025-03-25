import {createContext, ReactNode, useState} from "react";
import {PostType} from "../types/postType";

type PostsContextInstanseType = {
	posts: PostType[];
	setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

const PostsContextInstanse = createContext<PostsContextInstanseType | undefined>(undefined);

const PostsContext = ({children}: {children: ReactNode}) => {
	const [posts, setPosts] = useState<PostType[]>([]);

	return <PostsContextInstanse.Provider value={{posts, setPosts}}>{children}</PostsContextInstanse.Provider>;
};

export {PostsContextInstanse, PostsContext};
