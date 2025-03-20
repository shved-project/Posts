import {useEffect, useOptimistic, useState} from "react";
import Button from "../components/Button";
import ContentBlock from "../components/ContentBlock";
import {Posts} from "../types/postsType";
import getPosts from "../api/getPosts";
import Loading from "../components/Loading";
import emptyIcon from "../icons/empty.svg";
import errorIcon from "../icons/error.svg";
import BaseLink from "../components/BaseLink";
import ErrorGetPosts from "../components/ErrorGetPosts";
import useAuthContext from "../hooks/useAuthContext";
import useMessageContext from "../hooks/useMessageContext";
import Modal from "../components/Modal";
import CreatePostForm from "../components/CreatePostForm";
import PostsList from "../components/PostsList";
import {AnimatePresence} from "motion/react";

const Home = () => {
	const {user} = useAuthContext();
	const {showMessage} = useMessageContext();

	const [posts, setPosts] = useState<Posts[] | null>(null);
	const [empty, setEmpty] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<null | string>(null);
	const [showModal, setShowModal] = useState<boolean>(false);

	const [optimisticPosts, addOptimisticPost] = useOptimistic<Posts[] | null, Posts>(posts, (prevPosts, newPosts) => {
		if (prevPosts) {
			return [newPosts, ...prevPosts];
		} else {
			return [newPosts];
		}
	});

	useEffect(() => {
		const loadPosts = async () => {
			const postsData = await getPosts();

			if (typeof postsData === "string") {
				setLoading(false);
				setError(postsData);
				setPosts(null);
				setEmpty(false);
			} else {
				setLoading(false);
				setError(null);

				if (postsData.length === 0) {
					setEmpty(true);
					setPosts(null);
				} else {
					setEmpty(false);
					setPosts(postsData);
				}
			}
		};

		loadPosts();
	}, []);

	const handleCreatePost = () => {
		if (!user) {
			showMessage({messageText: "Для создания записи необходимо авторизоваться", type: "error"});
		} else {
			setShowModal(true);
		}
	};

	return (
		<>
			<title>Home</title>
			{loading && <Loading />}
			{optimisticPosts && (
				<>
					<ContentBlock title='Посты' className='max-sm:px-0'>
						<Button type='button' bgColor='green' className='mb-7 max-sm:ml-3' onClick={handleCreatePost}>
							Создать пост
						</Button>
						<PostsList posts={optimisticPosts} />
					</ContentBlock>
				</>
			)}
			{empty && !user && (
				<ErrorGetPosts img={emptyIcon} alt='Постов пока нет'>
					Постов пока нет. <br /> <BaseLink to={"register"}>Зарегистрируйтесь</BaseLink> и выложите пост
					первым!
				</ErrorGetPosts>
			)}
			{empty && user && (
				<ErrorGetPosts img={emptyIcon} alt='Постов пока нет'>
					{user.firstName}, выложите пост первым по кнопке ниже!
					<Button
						type='button'
						bgColor='green'
						className='mx-auto mt-4 font-medium'
						onClick={handleCreatePost}
					>
						Создать запись
					</Button>
				</ErrorGetPosts>
			)}
			{error && (
				<ErrorGetPosts img={errorIcon} alt='Ошибка'>
					{error}
				</ErrorGetPosts>
			)}
			<AnimatePresence>
				{showModal && (
					<Modal setShowModal={setShowModal} title='Новый пост'>
						<CreatePostForm
							posts={posts}
							setPosts={setPosts}
							addOptimisticPost={addOptimisticPost}
							setShowModal={setShowModal}
							setEmpty={setEmpty}
						/>
					</Modal>
				)}
			</AnimatePresence>
		</>
	);
};

export default Home;
