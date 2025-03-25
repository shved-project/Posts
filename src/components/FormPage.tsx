import {ReactNode, useEffect} from "react";
import Button from "./Button";
import ContentBlock from "./ContentBlock";
import Logo from "./Logo";
import useInvalidValueFormContext from "../hooks/useInvalidValueFormContext";
import {motion} from "motion/react";
import {showToUpVariant, staggerVariant} from "../animations/variants";

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
		<motion.div
			className='min-h-[100vh] flex flex-col items-center justify-center py-5 px-2'
			variants={staggerVariant}
			animate='visible'
			initial='hidden'
		>
			<motion.div variants={showToUpVariant}>
				<Logo size='large' />
			</motion.div>
			<motion.h1 className='text-4xl font-medium mt-7 mb-7 max-sm:text-3xl' variants={showToUpVariant}>
				{title}
			</motion.h1>
			<motion.div className='w-1/1 max-w-120' variants={showToUpVariant}>
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
			</motion.div>
		</motion.div>
	);
};

export default FormPage;
