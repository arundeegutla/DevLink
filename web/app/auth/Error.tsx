export default function Error({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="mt-4 text-red-600">{children}</div>
    </div>
  );
}
