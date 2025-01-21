import type { Metadata } from 'next'
import './global.css';
import Navbar from '@/src/components/Navbar';
import Header from '../components/Header';

export const metadata: Metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
}

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="h-svh">
                <Header />
                <div className="relative">
                    <main className="sm:px-8 mt-9 mx-auto max-w-7xl lg:px-8">
                        <div className="relative px-4 sm:px-8 lg:px-12 max-w-3xl lg:max-w-5xl mx-auto">
                             {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    )
}