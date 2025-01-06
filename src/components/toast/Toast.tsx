"use client";
import { ToastContext } from "@/app/toast-provider";
import { useContext, useEffect } from "react";

export const Toast = () => {
	const { showToast, toastContent, setShowToast } = useContext(ToastContext);

	useEffect(() => {
		const timerToLeave = setTimeout(() => {
			setShowToast(false);
		}, 3700);

		return () => clearTimeout(timerToLeave);
	});

	if (!showToast) return null;

	return (
		<section className="fixed bottom-0 left-0 right-0 text-center py-20 lg:py-32 transition-transform animate-from-bottom-explicit">
			<div className="absolute top-0 left-0 right-0 bottom-0 -skew-y-[8deg] h-[200%] bg-blue -z-10"></div>
			<div className="container flex items-center justify-center font-bold text-xl lg:text-2xl">
				{toastContent}
			</div>
		</section>
	);
};
