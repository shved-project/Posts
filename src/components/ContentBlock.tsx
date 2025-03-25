import {ReactNode} from "react";
import {motion} from "motion/react";
import {showToUpVariant, staggerVariant} from "../animations/variants";

const ContentBlock = ({children, title, className}: {children: ReactNode; title?: string; className?: string}) => {
	return (
		<motion.div variants={staggerVariant} animate='visible' initial='hidden'>
			{title && (
				<motion.h1 className='text-4xl font-medium mb-9 max-sm:text-3xl' variants={showToUpVariant}>
					{title}
				</motion.h1>
			)}
			<motion.section className={`p-5 bg-white rounded-lg w-1/1 ${className}`} variants={showToUpVariant}>
				{children}
			</motion.section>
		</motion.div>
	);
};

export default ContentBlock;
