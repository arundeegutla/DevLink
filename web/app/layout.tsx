import MobileWarning from '@components/MobileWarning';
import './globals.css';

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
      <body className="relative w-full h-screen">
        <MobileWarning />
        {children}
      </body>
    </html>
  );
}
