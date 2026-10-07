import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Archivo_Black } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-grotesk',
  display: 'swap'
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-archivo-black',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'DueroHub Thumbnail Maker',
  description: 'Create gaming thumbnails in your browser.'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFD84D'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${archivoBlack.variable}`}>
      <body className="font-body antialiased min-h-screen">{children}</body>
    </html>
  );
}
