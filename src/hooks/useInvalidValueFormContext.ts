import {use} from "react";
import {InvalidValueFormContextInstance} from "../context/InvalidValueFormContext";

const useInvalidValueFormContext = () => {
	const context = use(InvalidValueFormContextInstance);

	if (!context) throw new Error("Произошла непредвиденная ошибка");

	return context;
};

export default useInvalidValueFormContext;
