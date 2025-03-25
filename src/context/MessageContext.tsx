import {createContext, ReactNode, useRef, useState} from "react";
import {MessageType} from "../types/messageType";

type MessageContextInstanceType = {
	message: MessageType | null;
	showMessage: (newMessage: MessageType) => void;
};

const MessageContextInstance = createContext<MessageContextInstanceType | undefined>(undefined);

const MessageContext = ({children}: {children: ReactNode}) => {
	const [message, setMessage] = useState<MessageType | null>(null);
	const timeoutRef = useRef<number | null>(null);

	const showMessage = (newMessage: MessageType): void => {
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
