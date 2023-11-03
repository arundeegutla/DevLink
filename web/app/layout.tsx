import Head from 'next/head';
import './globals.css';
import HomeBar from '@components/common/HomeBar';

export const metadata = {
  title: 'DevLink',
  icons: {
    icon: '/favicons/favicon.ico',
    shortcut: '/favicons/apple-touch-icon.png',
    apple: '/favicons/apple-touch-icon.png',
  },
  manifest: '/favicons/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
