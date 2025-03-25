import {motion} from "motion/react";
import loadingIcon from "../icons/loading.svg";

const Loading = () => {
	return (
		<motion.img
			animate={{rotate: 360}}
			transition={{repeat: Infinity, duration: 0.7, ease: "linear"}}
			className='size-8 mx-auto'
			src={loadingIcon}
			alt='loading'
		/>
	);
};

export default Loading;
