import {ReactNode} from "react";
import {motion} from "motion/react";
import {showToUpVariant, staggerVariant} from "../animations/variants";

type ErrorGetPostsType = {
	children: ReactNode;
	img: string;
	alt?: string;
};

const ErrorGetPosts = ({children, img, alt = ""}: ErrorGetPostsType) => {
	return (
		<motion.div className='text-center px-4' variants={staggerVariant} animate='visible' initial='hidden'>
			<motion.img
				src={img}
				alt={alt}
				width='120'
				height='120'
				className='block mx-auto mb-3 max-sm:w-25'
				variants={showToUpVariant}
			/>
			<motion.h1 className='text-2xl font-bold max-sm:text-xl' variants={showToUpVariant}>
				{children}
			</motion.h1>
		</motion.div>
	);
};

export default ErrorGetPosts;
