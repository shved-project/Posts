import axios, {isAxiosError} from "axios";
import {UserData} from "../types/userDataType";
import {InvalidValueForm} from "../types/invalidValueFormType";

const register = async (
	_prevState: UserData | InvalidValueForm[] | string | null,
	formData: FormData
): Promise<UserData | InvalidValueForm[] | string> => {
	const valuesForm = Object.fromEntries(formData);

	const invalidValuesForm: InvalidValueForm[] = [];

	const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!\-+,.~[\]{}]).{8,}$/;

	for (const key in valuesForm) {
		if (key === "password" || key === "passwordRepeat") {
			if (typeof valuesForm[key] === "string" && !regexPassword.test(valuesForm[key])) {
				invalidValuesForm.push({
					name: key,
					invalidMessage: `Пароль должен содержать не менее 8 символов, маленькие латинские буквы, большие латинские буквы, символы "!-+,.~[]{}`,
				});
			} else if (typeof valuesForm[key] === "string" && valuesForm["password"] !== valuesForm["passwordRepeat"]) {
				invalidValuesForm.push({
					name: key,
					invalidMessage: "Упс! Пароли не совпадают. Попробуйте еще раз",
				});
			}
		} else {
			if (!valuesForm[key]) {
				invalidValuesForm.push({name: key, invalidMessage: "Это поле обязательно к заполнению"});
			}
		}
	}

	if (invalidValuesForm.length !== 0) {
		return invalidValuesForm;
	}

	try {
		const reg = await axios.post(
			"https://1b6f506abeed4f2b.mokky.dev/register",
			{
				firstName: formData.get("firstName"),
				lastName: formData.get("lastName"),
				email: formData.get("email"),
				password: formData.get("password"),
				avatar: "https://testshiftproject.github.io/img/user-placeholder.png",
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);

		const regData = reg.data;

		localStorage.setItem("token", regData.token);

		// Убираем пароль из объекта пользователя, чтобы сохранить в контекст
		const userData = Object.assign({}, regData.data);

		delete userData.password;

		return userData;
	} catch (error) {
		if (isAxiosError(error)) {
			if (error.response) {
				return "Пользователь с таким адресом эл. почты уже существует";
			} else if (error.request) {
				return "Нет ответа от сервера. Пожалуйста, повторите попытку позже";
			} else {
				return "Произошла непредвиденная ошибка. Пожалуйста, повторите попытку позже";
			}
		} else {
			return "Произошла непредвиденная ошибка. Пожалуйста, повторите попытку позже";
		}
	}
};

export default register;
