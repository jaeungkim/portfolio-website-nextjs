'use client'

import BasketballGame from '@/src/components/basketball-game/BasketballGame'

export default function Page() {
	return (
		<div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
			<BasketballGame className="w-full h-full" />
		</div>
	)
} 