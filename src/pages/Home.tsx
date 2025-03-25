import {useState} from "react";
import Button from "../components/Button";
import ContentBlock from "../components/ContentBlock";
import emptyIcon from "../icons/empty.svg";
import ErrorGetPosts from "../components/ErrorGetPosts";
import useAuthContext from "../hooks/useAuthContext";
import Modal from "../components/Modal";
import CreatePostForm from "../components/CreatePostForm";
import PostsList from "../components/PostsList";
import {AnimatePresence} from "motion/react";
import useOptimisticPosts from "../hooks/useOptimisticPosts";
import {useNavigate} from "react-router";
import useMessageContext from "../hooks/useMessageContext";

const Home = () => {
	const {user, setUser} = useAuthContext();
	const {showMessage} = useMessageContext();

	const [showModal, setShowModal] = useState<boolean>(false);

	const {optimisticPosts, newOptimisticPosts} = useOptimisticPosts();

	const navigate = useNavigate();

	const handleCreatePost = () => {
		const token = localStorage.getItem("token");

		if (token) {
			setShowModal(true);
		} else {
			showMessage({messageText: "Произошла ошибка. Необходимо авторизоваться", type: "error"});
			setUser(null);
			navigate("/auth");
		}
	};

	return (
		<>
			<title>Home</title>
			{optimisticPosts.length !== 0 ? (
				<>
					<ContentBlock title='Посты' className='max-sm:px-0'>
						<Button type='button' bgColor='green' className='mb-7 max-sm:ml-3' onClick={handleCreatePost}>
							Создать пост
						</Button>
						<PostsList posts={optimisticPosts} />
					</ContentBlock>
				</>
			) : (
				<ErrorGetPosts img={emptyIcon} alt='Постов пока нет'>
					{user!.firstName}, выложите пост первым по кнопке ниже!
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
			<AnimatePresence>
				{showModal && (
					<Modal setShowModal={setShowModal} title='Новый пост'>
						<CreatePostForm newOptimisticPosts={newOptimisticPosts} setShowModal={setShowModal} />
					</Modal>
				)}
			</AnimatePresence>
		</>
	);
};

export default Home;
