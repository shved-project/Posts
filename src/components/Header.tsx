import Button from "./Button";
import Logo from "./Logo";
import {Link} from "react-router";
import BaseLink from "./BaseLink";
import useAuthContext from "../hooks/useAuthContext";
import profileIcon from "../icons/profile.svg";

const Header = () => {
	const {user} = useAuthContext();

	return (
		<header className='flex justify-between px-8 py-3 max-md:px-2 fixed w-1/1 top-0 left-0 shadow-lg bg-white z-50'>
			<Logo size='small' />
			<div className='flex items-center gap-5'>
				{user ? (
					<Link to={"profile"}>
						<Button bgColor='blue' type={"button"} className='flex items-center gap-2'>
							<img src={profileIcon} alt='Профиль' width='18' height='18' />
							{user.firstName}
						</Button>
					</Link>
				) : (
					<>
						<BaseLink to={"register"}>Регистрация</BaseLink>
						<Link to={"auth"}>
							<Button bgColor='blue' type={"button"}>
								Войти
							</Button>
						</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
