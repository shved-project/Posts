import {Link, useNavigate} from "react-router";
import ContentBlock from "../components/ContentBlock";
import useAuthContext from "../hooks/useAuthContext";
import {useEffect, useState} from "react";
import useMessageContext from "../hooks/useMessageContext";
import Button from "../components/Button";
import Modal from "../components/Modal";
import {AnimatePresence} from "motion/react";

const Profile = () => {
	const {user, setUser} = useAuthContext();
	const {showMessage} = useMessageContext();
	const navigate = useNavigate();

	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		if (!user) {
			navigate("/auth");
			showMessage({messageText: "Для посещения страницы профиля необходимо авторизоваться", type: "error"});
		}
	}, []);

	const handleExit = () => {
		setUser(null);
		navigate("/");
		localStorage.removeItem("token");
		showMessage({messageText: "Вы вышли из аккаунта", type: "success"});
	};

	return (
		<>
			<title>My profile</title>
			<ContentBlock title='Мой профиль'>
				<div className='flex items-center gap-4 mb-5'>
					<div className='rounded-full w-max overflow-hidden shrink-0'>
						<img src={user?.avatar} alt='Аватар' width='120' height='120' className='max-sm:w-15' />
					</div>
					<div className='text-3xl font-bold max-sm:text-xl'>
						<p>
							{user?.firstName} {user?.lastName}
						</p>
					</div>
				</div>
				<Link
					to={"/myPosts"}
					className='border-t border-b border-current w-1/1 block py-3 px-5 hover:bg-gray-50 transition-colors duration-200'
				>
					Мои посты
				</Link>
				<Button onClick={() => setShowModal(true)} bgColor='red' type='button' className='mt-15 ml-auto'>
					Выйти
				</Button>
			</ContentBlock>
			<AnimatePresence>
				{showModal && (
					<Modal setShowModal={setShowModal}>
						<p className='text-lg'>Вы действительно хотите выйти?</p>
						<div className='flex items-center justify-end mt-10 gap-4'>
							<Button bgColor='blue' type='button' onClick={() => setShowModal(false)}>
								Отменить
							</Button>
							<Button bgColor='red' type='button' onClick={handleExit}>
								Выйти
							</Button>
						</div>
					</Modal>
				)}
			</AnimatePresence>
		</>
	);
};

export default Profile;
