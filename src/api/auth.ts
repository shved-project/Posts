import axios, {isAxiosError} from "axios";
import {UserData} from "../types/userDataType";
import {InvalidValueForm} from "../types/invalidValueFormType";

const auth = async (
	_prevState: UserData | InvalidValueForm[] | string | null,
	formData: FormData
): Promise<UserData | InvalidValueForm[] | string> => {
	const valuesForm = Object.fromEntries(formData);

	const invalidValuesForm: InvalidValueForm[] = [];

	for (const key in valuesForm) {
		if (!valuesForm[key]) {
			invalidValuesForm.push({
				name: key,
				invalidMessage: "Это поле обязательно к заполнению",
			});
		}
	}

	if (invalidValuesForm.length !== 0) {
		return invalidValuesForm;
	}

	try {
		const auth = await axios.post("https://1b6f506abeed4f2b.mokky.dev/auth", {
			email: formData.get("email"),
			password: formData.get("password"),
		});

		const authData = auth.data;

		localStorage.setItem("token", authData.token);

		// Убираем пароль из объекта пользователя, чтобы сохранить в контекст
		const userData = Object.assign({}, authData.data);

		delete userData.password;

		return userData;
	} catch (error) {
		if (isAxiosError(error)) {
			if (error.response) {
				return "Неверно указана эл. почта или пароль";
			} else if (error.request) {
				return "Нет ответа от сервера. Пожалуйста, повторите попытку позже";
			} else {
				return "Произошла непредвиденная ошибка";
			}
		} else {
			return "Произошла непредвиденная ошибка";
		}
	}
};

export default auth;
