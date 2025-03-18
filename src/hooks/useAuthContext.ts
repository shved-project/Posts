import {use} from "react";
import {AuthContextInstance} from "../context/AuthContext";

const useAuthContext = () => {
	const context = use(AuthContextInstance);

	if (!context) throw new Error("Произошла непредвиденная ошибка");

	return context;
};

export default useAuthContext;
