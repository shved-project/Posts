import {PostType} from "../types/postType";
import Post from "./Post";
import {motion} from "motion/react";

type PostsListProps = {
	posts: PostType[];
	newOptimisticPosts?: (action: PostType[]) => void;
	isMyPost?: boolean;
};

const PostsListStagger = {
	visible: {
		transition: {
			staggerChildren: 0.25,
		},
	},
};

const PostsList = ({posts, newOptimisticPosts, isMyPost}: PostsListProps) => {
	return (
		<motion.div className='flex flex-col gap-12' variants={PostsListStagger} animate='visible' initial='hidden'>
			{posts.map((post) => (
				<Post
					avatar={post.avatar}
					name={post.name}
					postImage={post.postImage}
					text={post.text}
					isPending={post.isPending}
					key={post.id}
					isMyPost={isMyPost}
					id={post.id}
					newOptimisticPosts={newOptimisticPosts}
				/>
			))}
		</motion.div>
	);
};

export default PostsList;
