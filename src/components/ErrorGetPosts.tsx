import {ReactNode} from "react";

type ErrorGetPostsType = {
	children: ReactNode;
	img: string;
	alt?: string;
};

const ErrorGetPosts = ({children, img, alt = ""}: ErrorGetPostsType) => {
	return (
		<div className='text-center'>
			<img src={img} alt={alt} width='120' height='120' className='block mx-auto mb-3' />
			<h1 className='text-xl font-bold'>{children}</h1>
		</div>
	);
};

export default ErrorGetPosts;
