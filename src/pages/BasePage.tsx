import {Outlet, useNavigate} from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useEffect} from "react";
import useAuthContext from "../hooks/useAuthContext";
import useMessageContext from "../hooks/useMessageContext";

const BasePage = () => {
	const {user} = useAuthContext();
	const {showMessage} = useMessageContext();

	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/auth");
			showMessage({messageText: "Необходимо авторизоваться", type: "error"});
		}
	}, []);

	if (!user) return null;

	return (
		<div className='min-h-[100vh] flex flex-col justify-between'>
			<Header />
			<div className='w-1/1 max-w-150 mx-auto pt-35 px-2'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default BasePage;
