import {ReactNode, useEffect} from "react";
import Button from "./Button";
import ContentBlock from "./ContentBlock";
import Logo from "./Logo";
import useInvalidValueFormContext from "../hooks/useInvalidValueFormContext";

type FormPageProps = {
	children: ReactNode;
	title: string;
	buttonText: string;
	isPending: boolean;
	formAction: (payload: FormData) => void;
};

const FormPage = ({children, title, buttonText, isPending, formAction}: FormPageProps) => {
	const {invalidValues, setInvalidValues} = useInvalidValueFormContext();

	useEffect(() => {
		return () => {
			if (invalidValues) {
				setInvalidValues(null);
			}
		};
	}, []);

	return (
		<div className='min-h-[100vh] flex flex-col items-center justify-center py-5'>
			<Logo size='large' />
			<h1 className='text-4xl font-medium mt-7 mb-2'>{title}</h1>
			<div className='w-120'>
				<ContentBlock>
					<form action={formAction}>
						<div className='flex flex-col gap-4 mb-8'>{children}</div>
						<Button
							type='submit'
							bgColor='blue'
							className='mx-auto disabled:bg-blue-200 disabled:cursor-not-allowed'
							disabled={isPending}
						>
							{buttonText}
						</Button>
					</form>
				</ContentBlock>
			</div>
		</div>
	);
};

export default FormPage;
