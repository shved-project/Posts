import {ReactNode} from "react";
import {AuthContext} from "./AuthContext";
import {MessageContext} from "./MessageContext";
import {InvalidValueFormContext} from "./InvalidValueFormContext";

const AllContext = ({children}: {children: ReactNode}) => {
	return (
		<AuthContext>
			<MessageContext>
				<InvalidValueFormContext>{children}</InvalidValueFormContext>
			</MessageContext>
		</AuthContext>
	);
};

export default AllContext;
