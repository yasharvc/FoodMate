"use client";

import React from "react";

type CircleButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	toolTip?: string;
	toolTipPosition?: "top" | "bottom" | "left" | "right";
};

export default function CircleButton({
	children,
	onClick,
	toolTip,
	toolTipPosition = "bottom",
}: CircleButtonProps) {
	const toolTipPos = `tooltip tooltip-${toolTipPosition}`;
	return (
		<>
			{toolTip && toolTip?.length > 0 ? (
				<div className={toolTipPos} data-tip={toolTip}>
					<button
						className="btn btn-ghost btn-circle"
						onClick={onClick}
					>
						{children}
					</button>
				</div>
			) : (
				<button className="btn btn-ghost btn-circle" onClick={onClick}>
					{children}
				</button>
			)}
		</>
	);
}
