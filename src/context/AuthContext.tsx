import {createContext, ReactNode, useState} from "react";
import {UserData} from "../types/userDataType";

type AuthContextInstanceType = {
	user: UserData | null;
	setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

const AuthContextInstance = createContext<undefined | AuthContextInstanceType>(undefined);

const AuthContext = ({children}: {children: ReactNode}) => {
	const [user, setUser] = useState<UserData | null>(null);

	return <AuthContextInstance.Provider value={{user, setUser}}>{children}</AuthContextInstance.Provider>;
};

export {AuthContext, AuthContextInstance};
