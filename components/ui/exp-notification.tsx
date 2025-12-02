"use client";

import { useEffect, useState } from "react";
import { Trophy, Zap } from "lucide-react";

interface ExpNotificationProps {
	isOpen: boolean;
	onClose: () => void;
	expGained: number;
	leveledUp: boolean;
	newLevel?: number;
	levelsGained?: number;
}

export function ExpNotification({
	isOpen,
	onClose,
	expGained,
	leveledUp,
	newLevel,
	levelsGained = 0,
}: ExpNotificationProps) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setShow(true);
		}
	}, [isOpen]);

	const handleClose = () => {
		setShow(false);
		setTimeout(onClose, 300); // Wait for animation
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
					show ? "opacity-100" : "opacity-0"
				}`}
				onClick={handleClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
				<div
					className={`pointer-events-auto relative w-full max-w-md transform rounded-2xl bg-background p-8 shadow-2xl transition-all duration-300 ${
						show ? "scale-100 opacity-100" : "scale-95 opacity-0"
					}`}
				>
					{/* Celebration Icon */}
					<div className="mb-6 flex justify-center">
						{leveledUp ? (
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
								<Trophy size={48} className="text-white" />
							</div>
						) : (
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
								<Zap size={48} className="text-white" />
							</div>
						)}
					</div>

					{/* Title */}
					<h2 className="mb-2 text-center font-bold text-3xl">
						{leveledUp ? "Level Up!" : "Workout Complete!"}
					</h2>

					{/* Level Up Message */}
					{leveledUp && (
						<p className="mb-4 text-center text-muted-foreground text-xl">
							You reached Level {newLevel}!
						</p>
					)}

					{/* EXP Gained */}
					<div className="mb-6 rounded-lg bg-muted p-4">
						<div className="flex items-center justify-center gap-2">
							<Zap size={24} className="text-blue-600" />
							<span className="font-bold text-2xl">+{expGained} EXP</span>
						</div>
					</div>

					{/* Continue Button */}
					<button
						type="button"
						onClick={handleClose}
						className="w-full rounded-lg bg-foreground py-3 font-semibold text-background text-lg transition-colors hover:opacity-90"
					>
						Continue
					</button>
				</div>
			</div>
		</>
	);
}

