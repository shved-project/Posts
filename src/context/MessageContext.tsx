import {createContext, ReactNode, useRef, useState} from "react";
import {messageType} from "../types/messageType";

type MessageContextInstanceType = {
	message: messageType | null;
	showMessage: (newMessage: messageType) => void;
};

const MessageContextInstance = createContext<MessageContextInstanceType | undefined>(undefined);

const MessageContext = ({children}: {children: ReactNode}) => {
	const [message, setMessage] = useState<messageType | null>(null);
	const timeoutRef = useRef<number | null>(null);

	const showMessage = (newMessage: messageType): void => {
		setMessage(newMessage);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setMessage(null);
			timeoutRef.current = null;
		}, 5000);
	};

	return <MessageContextInstance.Provider value={{message, showMessage}}>{children}</MessageContextInstance.Provider>;
};

export {MessageContextInstance, MessageContext};
