import useMessageContext from "../hooks/useMessageContext";
import {messageType} from "../types/messageType";

const Message = ({messageText, type}: messageType) => {
	const {message} = useMessageContext();

	const bgMessage = () => {
		switch (type) {
			case "success":
				return "bg-green-400";
			case "neutral":
				return "bg-gray-400";
			case "error":
				return "bg-red-400";
		}
	};

	if (message) {
		return (
			<div
				className={`fixed bottom-8 left-[50%] translate-[-50%] py-3 px-10 rounded-lg shadow-lg text-white max-w-100 text-center ${bgMessage()}`}
			>
				{messageText}
			</div>
		);
	} else {
		return null;
	}
};

export default Message;
