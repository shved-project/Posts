import {use} from "react";
import {MessageContextInstance} from "../context/MessageContext";

const useMessageContext = () => {
	const context = use(MessageContextInstance);

	if (!context) throw new Error("Произошла непредвиденная ошибка");

	return context;
};

export default useMessageContext;
