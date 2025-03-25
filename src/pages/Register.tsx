import {useActionState, useEffect, useState} from "react";
import Input from "../components/Input";
import register from "../api/register";
import useAuthContext from "../hooks/useAuthContext";
import {useNavigate} from "react-router";
import useMessageContext from "../hooks/useMessageContext";
import FormPage from "../components/FormPage";
import useInvalidValueFormContext from "../hooks/useInvalidValueFormContext";
import BaseLink from "../components/BaseLink";

const Register = () => {
	const {setUser} = useAuthContext();
	const {showMessage} = useMessageContext();
	const {setInvalidValues} = useInvalidValueFormContext();
	const [state, registerAction, isPending] = useActionState(register, null);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordRepeat: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	useEffect(() => {
		if (!isPending) {
			if (Array.isArray(state)) {
				setInvalidValues(state);
			} else if (typeof state === "string") {
				showMessage({messageText: state, type: "error"});
			} else {
				if (state !== null) {
					setInvalidValues(null);
					setUser(state);
					showMessage({messageText: `Добро пожаловать, ${state.firstName}!`, type: "success"});
					navigate("/");
				}
			}
		}
	}, [isPending]);

	return (
		<>
			<title>Register</title>
			<FormPage
				title='Регистрация'
				buttonText='Зарегистрироваться'
				isPending={isPending}
				formAction={registerAction}
			>
				<Input
					type='text'
					label='Имя'
					name='firstName'
					placeholder='Иван'
					autoFocus
					onChange={handleChange}
					value={formData.firstName}
				/>
				<Input
					type='text'
					label='Фамилия'
					name='lastName'
					placeholder='Иванов'
					onChange={handleChange}
					value={formData.lastName}
				/>
				<Input
					type='email'
					label='Эл. почта'
					name='email'
					placeholder='your@email.ru'
					onChange={handleChange}
					value={formData.email}
				/>
				<Input
					type='password'
					label='Пароль'
					name='password'
					onChange={handleChange}
					value={formData.password}
				/>
				<Input
					type='password'
					label='Повторите пароль'
					name='passwordRepeat'
					onChange={handleChange}
					value={formData.passwordRepeat}
				/>
				<p className='text-center'>
					Уже есть аккаунт? <BaseLink to={"/auth"}>Авторизуйтесь</BaseLink>
				</p>
			</FormPage>
		</>
	);
};

export default Register;
