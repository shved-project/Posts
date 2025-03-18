import axios, {isAxiosError} from "axios";
import {UserData} from "../types/userDataType";

const checkAuth = async (): Promise<UserData | string | null> => {
	const currentToken = localStorage.getItem("token");

	if (!currentToken) return null;

	try {
		const response = await axios.get("https://1b6f506abeed4f2b.mokky.dev/auth_me", {
			headers: {
				Authorization: `Bearer ${currentToken}`,
			},
		});

		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			if (error.response) {
				return "Пожалуйста, авторизуйтесь повторно";
			} else if (error.request) {
				return "Не удалось авторизоваться. Пожалуйста, проверьте подключение к интернету";
			} else {
				return "Произошла непредвиденная ошибка при авторизации";
			}
		} else {
			return "Произошла непредвиденная ошибка при авторизации";
		}
	}
};

export default checkAuth;
