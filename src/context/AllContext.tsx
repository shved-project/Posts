import {ReactNode} from "react";
import {AuthContext} from "./AuthContext";
import {MessageContext} from "./MessageContext";
import {InvalidValueFormContext} from "./InvalidValueFormContext";
import {PostsContext} from "./PostsContext";

const AllContext = ({children}: {children: ReactNode}) => {
	return (
		<AuthContext>
			<PostsContext>
				<MessageContext>
					<InvalidValueFormContext>{children}</InvalidValueFormContext>
				</MessageContext>
			</PostsContext>
		</AuthContext>
	);
};

export default AllContext;
