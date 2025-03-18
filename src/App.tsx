import {Route, Routes} from "react-router";
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

export default function App() {
	const {showMessage} = useMessageContext();
	const {setUser} = useAuthContext();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getAuth = async () => {
			try {
				const isAuth = await checkAuth();

				if (typeof isAuth === "string") {
					showMessage({messageText: isAuth, type: "error"});
				} else {
					if (isAuth) {
						setUser(isAuth);
					}
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
			{loading ? (
				<div className='flex items-center justify-center h-[100vh]'>
					<Loading />
				</div>
			) : (
				<div className='text-md text-gray-700 bg-gray-100 relative'>
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
