import {useEffect, useState} from "react";
import {InvalidValueForm} from "../types/invalidValueFormType";
import useInvalidValueFormContext from "../hooks/useInvalidValueFormContext";

type BaseInputProps = {
	label: string;
	name: string;
	type?: "password" | "email" | "text";
	placeholder?: string;
	autoFocus?: boolean;
	value?: string;
	className?: string;
};

type InputProps = BaseInputProps &
	(
		| {
				textarea: true;
				onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
				onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
		  }
		| {
				textarea?: false;
				onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
				onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
		  }
	);

const Input = ({
	label,
	type,
	name,
	placeholder,
	autoFocus,
	onChange,
	onKeyDown,
	value,
	textarea,
	className,
}: InputProps) => {
	const [isInvalidInput, setIsInvalidInput] = useState<InvalidValueForm | undefined>(undefined);
	const {invalidValues} = useInvalidValueFormContext();

	useEffect(() => {
		if (invalidValues) {
			setIsInvalidInput(invalidValues.find((invalidValue) => invalidValue.name === name));
		} else {
			setIsInvalidInput(undefined);
		}
	}, [invalidValues]);

	const classNameInput = `w-1/1 border-2 rounded-md py-1 px-3 focus-visible:border-[#61DAFB] focus:outline-none ${
		isInvalidInput ? "border-red-500" : "border-gray-500"
	} ${className}`;

	return (
		<label>
			<p className='mb-2'>{label}</p>
			{textarea ? (
				<textarea
					className={classNameInput}
					placeholder={placeholder}
					autoFocus={autoFocus}
					name={name}
					onFocus={() => setIsInvalidInput(undefined)}
					value={value}
					onKeyDown={onKeyDown}
					onChange={onChange}
				></textarea>
			) : (
				<input
					className={classNameInput}
					placeholder={placeholder}
					autoFocus={autoFocus}
					type={type}
					name={name}
					onChange={onChange}
					onKeyDown={onKeyDown}
					onFocus={() => setIsInvalidInput(undefined)}
					value={value}
				/>
			)}
			{isInvalidInput && <p className='text-[12px] text-red-500'>{isInvalidInput.invalidMessage}</p>}
		</label>
	);
};

export default Input;
