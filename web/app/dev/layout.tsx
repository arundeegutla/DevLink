import NavBar from '@components/common/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative h-screen bg-[#171717]">
      <NavBar />
      {children}
    </section>
  );
}
