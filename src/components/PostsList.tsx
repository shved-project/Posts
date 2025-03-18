import {Posts} from "../types/postsType";
import Post from "./Post";

const PostsList = ({posts}: {posts: Posts[]}) => {
	return (
		<div className='flex flex-col gap-12'>
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
		</div>
	);
};

export default PostsList;
