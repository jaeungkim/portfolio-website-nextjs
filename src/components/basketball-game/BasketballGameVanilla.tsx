import { useEffect, useRef } from 'react';

// Type declarations for the vanilla JS game
declare global {
	interface Window {
		BasketballGame: any;
	}
}

interface BasketballGameProps {
	className?: string;
}

export default function BasketballGameVanilla({ className }: BasketballGameProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const gameRef = useRef<any>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// Load the vanilla JS game
		const loadGame = () => {
			// Add script tag if not already loaded
			if (!window.BasketballGame) {
				const script = document.createElement('script');
				script.src = '/js/basketball-game.js';
				script.onload = () => {
					if (window.BasketballGame && containerRef.current) {
						gameRef.current = new window.BasketballGame('basketball-game-container');
					}
				};
				document.head.appendChild(script);
			} else if (containerRef.current) {
				gameRef.current = new window.BasketballGame('basketball-game-container');
			}
		};

		loadGame();

		return () => {
			if (gameRef.current) {
				gameRef.current.destroy();
				gameRef.current = null;
			}
		};
	}, []);

	return (
		<div
			id="basketball-game-container"
			ref={containerRef}
			className={`w-full h-full ${className ?? ''}`}
			style={{ width: '100vw', height: '100dvh', overflow: 'hidden' }}
		/>
	);
} 