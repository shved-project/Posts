import {ReactNode} from "react";
import {Link} from "react-router";

type BaseLinkProps = {
	to: string;
	children: ReactNode;
};

const BaseLink = ({to, children}: BaseLinkProps) => {
	return (
		<Link
			className='underline underline-offset-2 text-blue-400 hover:text-blue-500 transition-colors duration-200'
			to={to}
		>
			{children}
		</Link>
	);
};

export default BaseLink;
