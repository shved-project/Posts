import {ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";
import closeImg from "../icons/close.svg";

type ModalProps = {
	children: ReactNode;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	title?: string;
};

const Modal = ({children, setShowModal, title}: ModalProps) => {
	const body = document.body;
	const modalRoot = document.querySelector("#modal-root");

	useEffect(() => {
		body.style.overflow = "hidden";

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setShowModal(false);
			}
		};

		window.addEventListener("keydown", handleEscape);

		return () => {
			body.style.overflow = "auto";

			window.removeEventListener("keydown", handleEscape);
		};
	}, []);

	if (!modalRoot) {
		return null;
	}

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.target === event.currentTarget) {
			setShowModal(false);
		}
	};

	return createPortal(
		<div className='fixed inset-0 z-50 bg-gray-500/70 overflow-auto' onClick={handleOverlayClick}>
			<div className='relative w-1/1 max-w-150 bg-white mx-auto my-[5%] p-10 pt-18 rounded-2xl'>
				{title && <h2 className='text-2xl font-medium mb-5'>{title}</h2>}
				<button
					type='button'
					className='cursor-pointer absolute top-5 right-5'
					onClick={() => setShowModal(false)}
				>
					<img src={closeImg} alt='Закрыть окно' width='25' height='25' />
				</button>
				<div>{children}</div>
			</div>
		</div>,
		modalRoot
	);
};

export default Modal;
