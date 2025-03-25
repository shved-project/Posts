import {ReactNode} from "react";
import {Link} from "react-router";

type BaseLinkProps = {
	to: string;
	children: ReactNode;
	onClick?: () => void;
};

const BaseLink = ({to, children, onClick}: BaseLinkProps) => {
	return (
		<Link
			className='underline underline-offset-2 text-blue-400 hover:text-blue-500 transition-colors duration-200'
			to={to}
			onClick={onClick}
		>
			{children}
		</Link>
	);
};

export default BaseLink;
