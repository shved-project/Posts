import {use} from "react";
import {PostsContextInstanse} from "../context/PostsContext";

const usePostsContext = () => {
	const context = use(PostsContextInstanse);

	if (!context) throw new Error("Произошла непредвиденная ошибка");

	return context;
};

export default usePostsContext;
