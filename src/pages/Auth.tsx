import {useActionState, useEffect, useState} from "react";
import FormPage from "../components/FormPage";
import Input from "../components/Input";
import auth from "../api/auth";
import useAuthContext from "../hooks/useAuthContext";
import useMessageContext from "../hooks/useMessageContext";
import {useNavigate} from "react-router";
import useInvalidValueFormContext from "../hooks/useInvalidValueFormContext";
import BaseLink from "../components/BaseLink";

const Auth = () => {
	const {setUser} = useAuthContext();
	const {showMessage} = useMessageContext();
	const {setInvalidValues} = useInvalidValueFormContext();
	const [state, authAction, isPending] = useActionState(auth, null);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	useEffect(() => {
		if (Array.isArray(state)) {
			setInvalidValues(state);
		} else if (typeof state === "string") {
			showMessage({messageText: state, type: "error"});
		} else {
			if (state !== null) {
				setInvalidValues(null);
				setUser(state);
				showMessage({messageText: `С возвращением, ${state.firstName}!`, type: "success"});
				navigate("/");
			}
		}
	}, [isPending]);

	return (
		<>
			<title>Authorisation</title>
			<FormPage buttonText='Войти' title='Авторизация' formAction={authAction} isPending={isPending}>
				<Input
					label='Эл. почта'
					name='email'
					type='email'
					autoFocus
					placeholder='your@email.ru'
					onChange={handleChange}
					value={formData.email}
				/>
				<Input
					label='Пароль'
					name='password'
					type='password'
					onChange={handleChange}
					value={formData.password}
				/>
				<p className='text-center'>
					Нет аккаунта? <BaseLink to={"/register"}>Зарегистрируйтесь</BaseLink>
				</p>
			</FormPage>
		</>
	);
};

export default Auth;
