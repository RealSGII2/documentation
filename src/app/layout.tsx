import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.scss';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-mono',
});

export const viewport: Viewport = {
    themeColor: '#4493f8',
};

export const metadata: Metadata = {
    title: 'Home',
    description: 'Documentation for my various projects.',
    applicationName: 'RealSGII2 Docs',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
                {children}
            </body>
        </html>
    );
}
