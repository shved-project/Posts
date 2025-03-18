import {ReactNode} from "react";

const ContentBlock = ({children, title}: {children: ReactNode; title?: string}) => {
	return (
		<>
			{title && <h1 className='text-4xl font-medium'>{title}</h1>}
			<section className='p-5 bg-white rounded-lg mt-8 w-1/1'>{children}</section>
		</>
	);
};

export default ContentBlock;
