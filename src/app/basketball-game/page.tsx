'use client'

import BasketballGameVanilla from '@/src/components/basketball-game/BasketballGameVanilla'

export default function Page() {
	return (
		<div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
			<BasketballGameVanilla className="w-full h-full" />
		</div>
	)
} 