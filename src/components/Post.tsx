import {useState} from "react";
import {Posts} from "../types/postsType";
import {motion} from "motion/react";
import {showToUpVariant} from "../animations/variants";

type PostProps = Omit<Posts, "id">;

const Post = ({avatar, name, postImage, text, isPending}: PostProps) => {
	const [show, setShow] = useState<boolean>(false);

	const isManyText = text ? text.length > 120 : false;

	return (
		<motion.article
			className='bg-gray-100 rounded-lg'
			variants={!isPending ? showToUpVariant : undefined}
			animate={isPending ? {opacity: [1, 0.4, 1]} : undefined}
			transition={isPending ? {duration: 1, ease: "linear", repeat: Infinity} : undefined}
		>
			<header className='p-3'>
				<div className='flex items-center gap-2'>
					<div className='rounded-full overflow-hidden'>
						<img src={avatar} alt='avatar' width='50' height='50' />
					</div>
					<p className='font-medium text-black'>{name}</p>
				</div>
			</header>
			{postImage && (
				<div className='w-1/1 aspect-[16/9] bg-gray-200'>
					<img src={postImage} alt='post image' className='w-1/1 h-1/1 object-contain' />
				</div>
			)}
			{text && (
				<div className='p-3'>
					<div className={`text-md overflow-hidden relative ${!show ? "max-h-30" : "h-auto"}`}>
						<p>{text}</p>
						{!show && isManyText && (
							<div className='absolute inset-0 bg-gradient-to-b from-[00000000] to-gray-100 pointer-events-none'></div>
						)}
					</div>
					{isManyText && (
						<button
							type='button'
							className='bg-none mt-3 text-gray-400 cursor-pointer hover:text-gray-500 hover:underline hover:underline-offset-3 transition-colors duration-200'
							onClick={() => setShow(!show)}
						>
							{show ? "Скрыть" : "Показать ещё..."}
						</button>
					)}
				</div>
			)}
		</motion.article>
	);
};

export default Post;
