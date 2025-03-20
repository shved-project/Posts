import Button from "./Button";
import Logo from "./Logo";
import {Link} from "react-router";
import BaseLink from "./BaseLink";
import useAuthContext from "../hooks/useAuthContext";
import profileIcon from "../icons/profile.svg";
import {motion} from "motion/react";
import {useEffect, useState} from "react";
import {
	burgerBottomLineVariant,
	burgerCenterLineVariant,
	burgerMenuVariant,
	burgerTopLineVariant,
} from "../animations/burgerMenuVariants";
import {duration} from "../animations/variables";

const Header = () => {
	const {user} = useAuthContext();

	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

	const burgerLinesState = isOpenMenu ? "opened" : "closed";

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	return (
		<motion.header
			className='flex justify-between items-center px-8 py-3 max-md:px-2 fixed w-1/1 top-0 left-0 shadow-lg bg-white z-50'
			animate={{y: 0}}
			initial={{y: "-100%"}}
			transition={{duration: duration, delay: 0.2}}
		>
			<Logo size='small' />
			<div className='relative'>
				<button
					type='button'
					className='max-sm:flex max-sm:justify-center max-sm:items-center hidden aspect-square h-12 cursor-pointer relative'
					onClick={() => setIsOpenMenu(!isOpenMenu)}
				>
					<motion.span
						className='block absolute w-8/12 h-[4px] bg-gray-400 rounded-xl'
						variants={burgerTopLineVariant}
						animate={burgerLinesState}
						initial='closed'
					></motion.span>
					<motion.span
						className='block absolute w-8/12 h-[4px] bg-gray-400 rounded-xl'
						variants={burgerCenterLineVariant}
						animate={burgerLinesState}
					></motion.span>
					<motion.span
						className='block absolute w-8/12 h-[4px] bg-gray-400 rounded-xl'
						variants={burgerBottomLineVariant}
						animate={burgerLinesState}
						initial='closed'
					></motion.span>
				</button>
				<motion.div
					className={`max-sm:absolute max-sm:top-20 max-sm:right-0 overflow-hidden ${
						isMobile && "rounded-md bg-white shadow-xl"
					}`}
					variants={burgerMenuVariant}
					animate={!isOpenMenu && isMobile ? "closed" : "opened"}
					initial={isMobile ? "closed" : "opened"}
				>
					<div className={`gap-5 ${isMobile ? "flex flex-col items-center p-5" : "flex items-center gap-5"}`}>
						{user ? (
							<Link to={"profile"}>
								<Button
									bgColor='blue'
									type='button'
									className='flex items-center gap-2 w-max'
									onClick={() => setIsOpenMenu(false)}
								>
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
				</motion.div>
			</div>
		</motion.header>
	);
};

export default Header;
