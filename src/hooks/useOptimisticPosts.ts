import {useOptimistic} from "react";
import {PostType} from "../types/postType";
import usePostsContext from "./usePostsContext";

const useOptimisticPosts = () => {
	const {posts} = usePostsContext();

	const [optimisticPosts, newOptimisticPosts] = useOptimistic<PostType[], PostType[]>(
		posts,
		(_prevPosts, newPosts) => newPosts
	);

	return {optimisticPosts, newOptimisticPosts};
};

export default useOptimisticPosts;
