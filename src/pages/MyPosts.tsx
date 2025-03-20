import {useNavigate} from "react-router";
import ContentBlock from "../components/ContentBlock";
import ErrorGetPosts from "../components/ErrorGetPosts";
import PostsList from "../components/PostsList";
import useAuthContext from "../hooks/useAuthContext";
import emptyImg from "../icons/empty.svg";
import useMessageContext from "../hooks/useMessageContext";
import {useEffect} from "react";

const MyPosts = () => {
	const {user} = useAuthContext();
	const {showMessage} = useMessageContext();

	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/");
			showMessage({messageText: "Для просмотра своих постов необходимо авторизоваться", type: "error"});
		}
	}, []);

	return (
		<>
			<title>My posts</title>
			{user?.myPosts ? (
				<ContentBlock title='Мои посты' className='max-sm:px-0'>
					<PostsList posts={user!.myPosts} />
				</ContentBlock>
			) : (
				<ErrorGetPosts img={emptyImg}>У вас пока нет постов</ErrorGetPosts>
			)}
		</>
	);
};

export default MyPosts;
