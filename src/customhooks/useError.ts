import { ErrorContext } from "@/App";
import { ErrorContextType } from "@/interfaces/errorContext.model";
import { useContext } from "react";

export const useError = (): ErrorContextType => {
	const context = useContext(ErrorContext);
	if (!context) {
		throw new Error("useError must be used inside a ErrorProvider");
	}
	return context;
};
