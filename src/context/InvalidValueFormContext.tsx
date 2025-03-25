import {createContext, ReactNode, useState} from "react";
import {InvalidValueForm} from "../types/invalidValueFormType";

type InvalidValueFormContextInstanceType = {
	invalidValues: InvalidValueForm[] | null;
	setInvalidValues: React.Dispatch<React.SetStateAction<InvalidValueForm[] | null>>;
};

const InvalidValueFormContextInstance = createContext<InvalidValueFormContextInstanceType | undefined>(undefined);

const InvalidValueFormContext = ({children}: {children: ReactNode}) => {
	const [invalidValues, setInvalidValues] = useState<InvalidValueForm[] | null>(null);

	return (
		<InvalidValueFormContextInstance.Provider value={{invalidValues, setInvalidValues}}>
			{children}
		</InvalidValueFormContextInstance.Provider>
	);
};

export {InvalidValueFormContext, InvalidValueFormContextInstance};
