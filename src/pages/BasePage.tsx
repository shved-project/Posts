import {Outlet} from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BasePage = () => {
	return (
		<div className='min-h-[100vh] flex flex-col justify-between'>
			<Header />
			<div className='w-150 mx-auto pt-25 px-2'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default BasePage;
