export default function ProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="flex flex-row w-full items-center justify-center py-5 h-28">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map(
        (number, indx) => (
          <div key={indx} className="flex flex-row items-center">
            <div
              className={`transition-all duration-500 ease-in-out rounded-full aspect-square flex items-center justify-center ${
                number == currentStep
                  ? 'w-14 text-2xl bg-[#11ef7113] text-[#47ab80] border-2 border-[#11ef71a8]'
                  : number < currentStep
                  ? 'w-10 text-xl bg-[#11ef712a] text-[#47ab80]'
                  : 'w-10 text-xl bg-[#6060600b] text-[#c0c0c0] border-2 border-[#606060e6]'
              }`}>
              {number}
            </div>
            {indx < totalSteps - 1 && (
              <hr
                className={`border-t border-2 border-gray-500 w-16 ${
                  number < currentStep && 'border-green-900'
                }`}
              />
            )}
          </div>
        )
      )}
    </div>
  );
}
