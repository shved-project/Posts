import {useState} from "react";
import {PostType} from "../types/postType";
import {AnimatePresence, motion} from "motion/react";
import {showToUpVariant} from "../animations/variants";
import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";
import usePostsContext from "../hooks/usePostsContext";
import useMessageContext from "../hooks/useMessageContext";
import deletePost from "../api/deletePost";
import EditPostForm from "./EditPostForm";
import {isAxiosError} from "axios";
import {flushSync} from "react-dom";

type PostProps = Omit<PostType, "user_id"> & {isMyPost?: boolean; newOptimisticPosts?: (action: PostType[]) => void};

type TypeModal = "edit" | "delete" | null;

const Post = ({avatar, name, postImage, text, isPending, isMyPost, id, newOptimisticPosts}: PostProps) => {
	const {posts, setPosts} = usePostsContext();
	const {showMessage} = useMessageContext();

	const [showText, setShowText] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [typeModal, setTypeModal] = useState<TypeModal>(null);

	const isManyText = text ? text.length > 120 : false;

	const handleShowModal = (typeModal: TypeModal) => {
		setShowModal(true);
		setTypeModal(typeModal);
	};

	const handleDeletePost = async () => {
		const deletedPosts = posts.filter((post) => post.id !== id);
		if (newOptimisticPosts) {
			newOptimisticPosts(deletedPosts);
		}
		flushSync(() => {
			showMessage({messageText: "Пост удаляется...", type: "neutral"});
			setShowModal(false);
		});

		try {
			await deletePost(id, postImage?.id);

			setPosts(deletedPosts);
			showMessage({messageText: "Пост удалён", type: "success"});
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response) {
					showMessage({
						messageText:
							"При удалении поста произошла ошибка на стороне сервера. Мы уже работаем над проблемой",
						type: "error",
					});
				} else if (error.request) {
					showMessage({
						messageText: "Не удалось получить данные с сервера. Пожалуйста, повторите попытку позже",
						type: "error",
					});
				} else {
					showMessage({
						messageText: "Произошла непредвиденная ошибка",
						type: "error",
					});
				}
			} else {
				showMessage({
					messageText: "Произошла непредвиденная ошибка",
					type: "error",
				});
			}
		}
	};

	return (
		<>
			<motion.article variants={showToUpVariant}>
				<motion.div
					className='bg-gray-100 rounded-lg max-sm:rounded-none'
					animate={isPending ? {opacity: [1, 0.4, 1]} : undefined}
					transition={isPending ? {duration: 1, ease: "linear", repeat: Infinity} : undefined}
					initial={{opacity: 1}}
				>
					{isMyPost && (
						<div className='flex items-center justify-end pt-3 pr-3 gap-2'>
							<button
								type='button'
								className='cursor-pointer text-amber-500'
								title='Редактировать'
								onClick={() => handleShowModal("edit")}
							>
								<svg
									version='1.0'
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 512.000000 512.000000'
									preserveAspectRatio='xMidYMid meet'
								>
									<metadata>Created by potrace 1.16, written by Peter Selinger 2001-2019</metadata>
									<g
										transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
										fill='currentColor'
										stroke='none'
									>
										<path
											d='M3768 4833 l-288 -288 533 -533 532 -532 288 288 287 288 0 60 c0 52
-4 67 -29 100 -34 46 -855 864 -891 888 -16 10 -46 16 -84 16 l-60 0 -288
-287z'
										/>
										<path
											d='M2020 3085 l-1255 -1255 533 -532 532 -533 1255 1255 1255 1255 -533
533 -532 532 -1255 -1255z'
										/>
										<path
											d='M592 1574 c-5 -11 -141 -326 -302 -702 -286 -668 -292 -684 -288
-738 4 -47 10 -61 41 -92 32 -31 43 -36 94 -39 57 -4 71 1 748 292 380 163
693 299 697 303 4 4 -215 230 -486 501 -432 432 -495 491 -504 475z'
										/>
									</g>
								</svg>
							</button>
							<button
								type='button'
								className='cursor-pointer text-red-500'
								title='Удалить'
								onClick={() => handleShowModal("delete")}
							>
								<svg
									version='1.0'
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 512.000000 512.000000'
									preserveAspectRatio='xMidYMid meet'
								>
									<metadata>Created by potrace 1.16, written by Peter Selinger 2001-2019</metadata>
									<g
										transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
										fill='currentColor'
										stroke='none'
									>
										<path
											d='M2205 5101 c-278 -75 -496 -291 -570 -565 l-18 -66 -148 0 c-192 0
-300 -22 -444 -91 -193 -92 -351 -250 -446 -447 -17 -34 -33 -78 -36 -96 -7
-47 27 -120 69 -146 33 -20 43 -20 1948 -20 1905 0 1915 0 1948 20 42 26 76
99 69 146 -3 18 -19 62 -36 96 -127 264 -368 456 -649 518 -64 15 -126 20
-238 20 l-151 0 -18 68 c-38 142 -147 312 -258 402 -76 62 -171 115 -262 147
l-80 28 -305 2 c-272 2 -313 1 -375 -16z m655 -310 c99 -32 169 -81 237 -166
29 -36 83 -134 83 -149 0 -3 -279 -6 -620 -6 -341 0 -620 3 -620 6 0 15 54
113 83 149 86 108 187 166 322 185 33 5 148 7 255 5 164 -2 205 -6 260 -24z'
										/>
										<path
											d='M900 3336 c0 -19 47 -695 105 -1503 72 -1010 109 -1484 120 -1519 20
-67 81 -161 136 -207 24 -21 73 -53 109 -70 l65 -32 1125 0 1125 0 65 32 c36
17 85 49 109 70 55 46 116 140 136 207 11 35 48 507 120 1519 58 808 105 1484
105 1503 l0 34 -1660 0 -1660 0 0 -34z m2297 -654 c12 -7 31 -27 42 -46 28
-45 28 -60 -18 -961 -41 -821 -38 -793 -104 -834 -67 -41 -156 -22 -196 42
-28 46 -28 61 18 962 41 809 39 792 97 830 52 34 105 36 161 7z m-1120 -3 c66
-41 63 -13 104 -834 46 -901 46 -916 18 -962 -40 -64 -129 -83 -196 -42 -66
41 -63 13 -104 834 -46 901 -46 916 -18 961 11 19 33 41 47 49 40 21 109 19
149 -6z'
										/>
									</g>
								</svg>
							</button>
						</div>
					)}
					<header className='p-3'>
						<div className='flex items-center gap-2'>
							<div className='rounded-full overflow-hidden'>
								<img src={avatar} alt='avatar' width='50' height='50' className='max-sm:w-10' />
							</div>
							<p className='font-medium text-black'>{name}</p>
						</div>
					</header>
					{postImage && (
						<div className='w-1/1 aspect-[16/9] bg-gray-200'>
							<img src={postImage.url} alt='post image' className='w-1/1 h-1/1 object-contain' />
						</div>
					)}
					{text && (
						<div className='p-3'>
							<div className={`text-md overflow-hidden relative ${!showText ? "max-h-30" : "h-auto"}`}>
								<p>{text}</p>
								{!showText && isManyText && (
									<div className='absolute inset-0 bg-gradient-to-b from-[00000000] to-gray-100 pointer-events-none'></div>
								)}
							</div>
							{isManyText && (
								<button
									type='button'
									className='bg-none mt-3 text-gray-400 cursor-pointer hover:text-gray-500 hover:underline hover:underline-offset-3 transition-colors duration-200'
									onClick={() => setShowText(!showText)}
								>
									{showText ? "Скрыть" : "Показать ещё..."}
								</button>
							)}
						</div>
					)}
				</motion.div>
			</motion.article>
			<AnimatePresence>
				{showModal && typeModal === "edit" && (
					<Modal setShowModal={setShowModal} title='Редактирование поста'>
						<EditPostForm
							setShowModal={setShowModal}
							post={posts.find((post) => post.id === id)!}
							newOptimisticPosts={newOptimisticPosts!}
						/>
					</Modal>
				)}
				{showModal && typeModal === "delete" && (
					<ConfirmationModal
						stateModal={setShowModal}
						actionForm={handleDeletePost}
						modalText='Вы действительно хотите удалить пост?'
						actionButtonText='Удалить'
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default Post;
