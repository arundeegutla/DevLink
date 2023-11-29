interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl">
        {message} {':('}
      </h1>
    </div>
  );
}
