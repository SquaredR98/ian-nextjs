"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import "./styles.css";

// Minimum time (ms) the splash stays visible so the animation plays fully
// (logo entry 0.6s + bar fill 1.2s = ~1.2s minimum feels natural)
const MIN_DISPLAY_MS = 1200;

// Set to true to extend display for debugging the animation
const SPLASH_DEBUG = false;
const DEBUG_DELAY_MS = 5000;

/**
 * Waits until the page layout has truly stabilized:
 * 1. Document fonts loaded (prevents font-swap layout shift)
 * 2. All <img> in the viewport have decoded
 * 3. requestIdleCallback / double-rAF to let the browser finish painting
 */
function waitForLayoutReady(): Promise<void> {
	return new Promise((resolve) => {
		const checks: Promise<void>[] = [];

		// Wait for fonts
		if (document.fonts?.ready) {
			checks.push(document.fonts.ready.then(() => {}));
		}

		// Wait for visible images to decode
		const images = document.querySelectorAll<HTMLImageElement>("img");
		images.forEach((img) => {
			if (!img.complete && img.decode) {
				checks.push(img.decode().catch(() => {}));
			}
		});

		Promise.all(checks).then(() => {
			// Double rAF ensures browser has painted at least one frame
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					// requestIdleCallback waits until the main thread is idle
					if ("requestIdleCallback" in window) {
						(window as Window).requestIdleCallback(() => resolve(), { timeout: 500 });
					} else {
						setTimeout(resolve, 100);
					}
				});
			});
		});
	});
}

/**
 * Full-screen splash loader shown on initial page load.
 * White background, IAN logo with subtle glow rings and loading bar.
 * Waits for layout to stabilize, then fades out smoothly.
 */
export function PageSplash() {
	const [visible, setVisible] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);

	const dismiss = useCallback(() => {
		setFadeOut(true);
	}, []);

	useEffect(() => {
		let cancelled = false;
		const startTime = Date.now();

		waitForLayoutReady().then(() => {
			if (cancelled) return;

			const elapsed = Date.now() - startTime;
			const debugDelay = SPLASH_DEBUG ? DEBUG_DELAY_MS : 0;
			// Wait at least MIN_DISPLAY_MS so the animation plays fully
			const remaining = Math.max(MIN_DISPLAY_MS, debugDelay) - elapsed;

			if (remaining > 0) {
				setTimeout(() => { if (!cancelled) dismiss(); }, remaining);
			} else {
				dismiss();
			}
		});

		return () => { cancelled = true; };
	}, [dismiss]);

	useEffect(() => {
		if (!fadeOut) return;
		// Remove from DOM after the slow fade-out animation completes
		const timer = setTimeout(() => setVisible(false), 900);
		return () => clearTimeout(timer);
	}, [fadeOut]);

	if (!visible) return null;

	return (
		<div className={`page-splash ${fadeOut ? "page-splash-exit" : ""}`}>
			<div className="page-splash-content">
				{/* Glow rings */}
				<div className="page-splash-ring page-splash-ring-1" />
				<div className="page-splash-ring page-splash-ring-2" />

				{/* Logo */}
				<div className="page-splash-logo">
					<Image
						src="/home/logo.png"
						alt="Injury Assistance Network"
						width={280}
						height={100}
						priority
					/>
				</div>

				{/* Animated bar */}
				<div className="page-splash-bar">
					<div className="page-splash-bar-fill" />
				</div>
			</div>
		</div>
	);
}
