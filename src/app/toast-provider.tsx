"use client";

import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

interface ToastContextType {
	toastContent: React.ReactNode | null;
	setToastContent: Dispatch<SetStateAction<ReactNode>>;
	showToast: boolean;
	setShowToast: Dispatch<SetStateAction<boolean>>;
}

export const ToastContext = createContext<ToastContextType>({
	toastContent: null,
	setToastContent: () => {},
	showToast: false,
	setShowToast: () => {},
});

export default function ToastProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [toastContent, setToastContent] = useState<React.ReactNode | null>(
		null
	);
	const [showToast, setShowToast] = useState<boolean>(false);

	return (
		<ToastContext.Provider
			value={{
				showToast,
				toastContent,
				setToastContent,
				setShowToast,
			}}
		>
			{children}
		</ToastContext.Provider>
	);
}
