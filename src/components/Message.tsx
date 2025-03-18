import {duration} from "../animations/variables";
import useMessageContext from "../hooks/useMessageContext";
import {AnimatePresence, motion} from "motion/react";

const Message = () => {
	const {message} = useMessageContext();

	const bgMessage = () => {
		switch (message?.type) {
			case "success":
				return "bg-green-400";
			case "neutral":
				return "bg-gray-400";
			case "error":
				return "bg-red-400";
		}
	};

	return (
		<AnimatePresence>
			{message && (
				<motion.div
					className={`fixed bottom-8 left-[50%] translate-[-50%] py-3 px-10 rounded-lg shadow-lg text-white max-w-100 text-center ${bgMessage()}`}
					animate={{y: 0}}
					initial={{y: 500}}
					transition={{duration: duration, type: "spring", stiffness: 260, damping: 20}}
					exit={{y: 500}}
				>
					{message.messageText}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Message;
