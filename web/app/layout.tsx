import './globals.css';
import NavBarBasic from '@components/common/NavBar-Basic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBarBasic />
        {children}
      </body>
    </html>
  );
}
