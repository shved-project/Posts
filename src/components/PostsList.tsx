import {Posts} from "../types/postsType";
import Post from "./Post";
import {motion} from "motion/react";

const PostsListStagger = {
	visible: {
		transition: {
			staggerChildren: 0.25,
		},
	},
};

const PostsList = ({posts}: {posts: Posts[]}) => {
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
				/>
			))}
		</motion.div>
	);
};

export default PostsList;
