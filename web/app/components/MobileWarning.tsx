'use client';
import { useEffect, useState } from 'react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div>
      {isMobile && (
        <div className="w-full h-full fixed top-0 z-50 flex flex-col items-center justify-center bg-[#2c357b] text-2xl text-gray-300 whitespace-nowrap">
          {`✨DevLink is still being developed for mobile ❤️`}
          <div className="text-xl text-gray-400">
            View on desktop to access devlink
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileWarning;
