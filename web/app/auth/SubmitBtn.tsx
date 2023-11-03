interface SubmitBtnProps {
  label: string;
  onClick: () => void;
}

export default function SubmitBtn({ label, onClick }: SubmitBtnProps) {
  return (
    <div className="mt-4">
      <button
        onClick={onClick}
        role="button"
        aria-label={label}
        className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
        {label}
      </button>
    </div>
  );
}
