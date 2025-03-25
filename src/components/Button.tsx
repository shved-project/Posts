import {ReactNode} from "react";

type ButtonProps = {
	children: ReactNode;
	bgColor: "blue" | "green" | "red";
	type: "button" | "submit" | "reset";
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	ref?: React.RefObject<HTMLButtonElement | null>;
};

const Button = ({children, bgColor, type, className, disabled, onClick, ref}: ButtonProps) => {
	const colorVariants = {
		blue: "bg-blue-600 hover:bg-blue-700",
		green: "bg-green-600 hover:bg-green-700",
		red: "bg-red-600 hover:bg-red-700",
	};

	return (
		<button
			className={`${colorVariants[bgColor]} ${className} block px-4 py-1.5 text-white rounded-lg cursor-pointer transition-colors duration-200`}
			type={type}
			disabled={disabled}
			onClick={onClick}
			ref={ref}
		>
			{children}
		</button>
	);
};

export default Button;
