import {Route, Routes, useNavigate} from "react-router";
import BasePage from "./pages/BasePage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import useAuthContext from "./hooks/useAuthContext";
import checkAuth from "./api/checkAuth";
import {useEffect, useState} from "react";
import Loading from "./components/Loading";
import Profile from "./pages/Profile";
import Message from "./components/Message";
import useMessageContext from "./hooks/useMessageContext";
import MyPosts from "./pages/MyPosts";
import getPosts from "./api/getPosts";
import usePostsContext from "./hooks/usePostsContext";
import ErrorGetPosts from "./components/ErrorGetPosts";
import errorIcon from "./icons/error.svg";

export default function App() {
	const {setUser} = useAuthContext();
	const {setPosts} = usePostsContext();
	const {showMessage} = useMessageContext();

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<null | string>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const getAuth = async () => {
			try {
				const isAuth = await checkAuth();

				if (isAuth) {
					if (typeof isAuth === "string") {
						showMessage({messageText: isAuth, type: "error"});
						navigate("/auth");
					} else {
						setUser(isAuth);

						const postsData = await getPosts();

						if (typeof postsData === "string") {
							setError(postsData);
							setPosts([]);
						} else {
							setError(null);

							if (postsData.length === 0) {
								setPosts([]);
							} else {
								setPosts(postsData);
							}
						}
					}
				} else {
					navigate("/auth");
					showMessage({messageText: "Необходимо авторизоваться", type: "error"});
				}

				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		getAuth();
	}, []);

	return (
		<>
			{loading || error ? (
				<div className='flex items-center justify-center h-[100vh]'>
					{loading && <Loading />}
					{error && (
						<ErrorGetPosts img={errorIcon} alt='Ошибка'>
							{error}
						</ErrorGetPosts>
					)}
				</div>
			) : (
				<div className='max-sm:text-base text-xl text-gray-700 bg-gray-100 relative'>
					<Routes>
						<Route path='/' element={<BasePage />}>
							<Route index element={<Home />} />
							<Route path='profile' element={<Profile />} />
							<Route path='myPosts' element={<MyPosts />} />
						</Route>
						<Route path='register' element={<Register />} />
						<Route path='auth' element={<Auth />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
					<Message />
				</div>
			)}
		</>
	);
}
