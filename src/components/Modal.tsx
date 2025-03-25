import {ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";
import closeImg from "../icons/close.svg";
import {motion} from "motion/react";
import {duration} from "../animations/variables";
import useInvalidValueFormContext from "../hooks/useInvalidValueFormContext";

type ModalProps = {
	children: ReactNode;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	title?: string;
};

const Modal = ({children, setShowModal, title}: ModalProps) => {
	const {invalidValues, setInvalidValues} = useInvalidValueFormContext();

	const body = document.body;
	const modalRoot = document.querySelector("#modal-root")!;

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

			if (invalidValues) {
				setInvalidValues(null);
			}
		};
	}, []);

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.target === event.currentTarget) {
			setShowModal(false);
		}
	};

	return createPortal(
		<motion.div
			className='fixed inset-0 z-50 overflow-auto px-2'
			onClick={handleOverlayClick}
			animate={{backgroundColor: "rgba(106, 114, 130, 0.75)", backdropFilter: "blur(15px)"}}
			transition={{duration: duration}}
			exit={{backgroundColor: "rgba(0, 0, 0, 0)", backdropFilter: "blur(0px)"}}
		>
			<motion.div
				className='relative w-1/1 max-w-150 bg-white mx-auto my-[5%] p-10 pt-18 rounded-2xl max-sm:px-4 max-sm:py-16'
				animate={{opacity: 1, scale: 1}}
				initial={{opacity: 0, scale: 0.98}}
				transition={{duration: duration}}
				exit={{opacity: 0, scale: 0.98}}
			>
				{title && <h2 className='text-2xl font-medium mb-5'>{title}</h2>}
				<button
					type='button'
					className='cursor-pointer absolute top-5 right-5'
					onClick={() => setShowModal(false)}
				>
					<img src={closeImg} alt='Закрыть окно' width='25' height='25' className='max-sm:w-5' />
				</button>
				<div>{children}</div>
			</motion.div>
		</motion.div>,
		modalRoot
	);
};

export default Modal;
