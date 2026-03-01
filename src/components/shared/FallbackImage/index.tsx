"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface FallbackImageProps extends Omit<ImageProps, "onError"> {
	fallbackType?: "provider" | "blog" | "specialty" | "avatar" | "generic";
	fallbackText?: string;
}

/**
 * A wrapper around next/image that renders a styled placeholder
 * when the image fails to load.
 */
export function FallbackImage({
	fallbackType = "generic",
	fallbackText,
	alt,
	className,
	width,
	height,
	...props
}: FallbackImageProps) {
	const [hasError, setHasError] = useState(false);

	if (hasError) {
		return (
			<ImagePlaceholder
				type={fallbackType}
				text={fallbackText || alt}
				width={Number(width) || 160}
				height={Number(height) || 120}
				className={className}
			/>
		);
	}

	return (
		<Image
			alt={alt}
			className={className}
			width={width}
			height={height}
			onError={() => setHasError(true)}
			{...props}
		/>
	);
}

/* ─── Placeholder ──────────────────────────────────────────────────── */

const TYPE_CONFIG = {
	provider: { bg: "#e8edff", color: "#1e195c", icon: "business" },
	blog: { bg: "#f0f0f0", color: "#6c757d", icon: "article" },
	specialty: { bg: "#e8f5e9", color: "#2e7d32", icon: "medical" },
	avatar: { bg: "#e3f2fd", color: "#1565c0", icon: "person" },
	generic: { bg: "#f5f5f5", color: "#9e9e9e", icon: "image" },
} as const;

function ImagePlaceholder({
	type,
	text,
	width,
	height,
	className,
}: {
	type: keyof typeof TYPE_CONFIG;
	text: string;
	width: number;
	height: number;
	className?: string | undefined;
}) {
	const config = TYPE_CONFIG[type];
	const initial = text?.charAt(0)?.toUpperCase() || "?";
	const hintSize = Math.min(width, height);

	// If a className is provided, the CSS class likely controls dimensions
	// (e.g. w-full h-full or fixed sizes). Don't set inline width/height
	// because inline styles would override CSS class rules.
	// If no className, use the pixel dims as fallback so the placeholder
	// matches the same space next/image would have occupied.
	const sizeStyle: React.CSSProperties = className
		? {}
		: { width, height };

	return (
		<div
			className={className}
			style={{
				...sizeStyle,
				backgroundColor: config.bg,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				gap: 4,
				borderRadius: 6,
				overflow: "hidden",
			}}
			role="img"
			aria-label={text || "Image unavailable"}
		>
			<span
				style={{
					fontSize: Math.max(hintSize * 0.35, 14),
					fontWeight: 700,
					color: config.color,
					lineHeight: 1,
				}}
			>
				{initial}
			</span>
			{hintSize >= 80 && (
				<span
					style={{
						fontSize: 11,
						color: config.color,
						opacity: 0.6,
						textAlign: "center",
						maxWidth: "90%",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					{text}
				</span>
			)}
		</div>
	);
}
