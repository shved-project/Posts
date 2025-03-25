import ContentBlock from "../components/ContentBlock";
import ErrorGetPosts from "../components/ErrorGetPosts";
import PostsList from "../components/PostsList";
import emptyImg from "../icons/empty.svg";
import useOptimisticPosts from "../hooks/useOptimisticPosts";

const MyPosts = () => {
	const {optimisticPosts, newOptimisticPosts} = useOptimisticPosts();

	return (
		<>
			<title>My posts</title>
			{optimisticPosts.length !== 0 ? (
				<ContentBlock title='Мои посты' className='max-sm:px-0'>
					<PostsList posts={optimisticPosts} newOptimisticPosts={newOptimisticPosts} isMyPost />
				</ContentBlock>
			) : (
				<ErrorGetPosts img={emptyImg}>У вас пока нет постов</ErrorGetPosts>
			)}
		</>
	);
};

export default MyPosts;
