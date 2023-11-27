'use client';
import { useState } from 'react';

const View = () => {
  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');

  const handleLeftInputChange = (event: any) => {
    const newValue: string = event.target.value;
    let str = newValue.replaceAll('e', 'PRESSED');
    setLeftValue(str);
    // Update the right text box value
    setRightValue(str);
  };

  const handleRightInputChange = (event: any) => {
    const newValue = event.target.value;
    setRightValue(newValue);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="text-black">
        <label>Left Text Box:</label>
        <input type="text" value={leftValue} onChange={handleLeftInputChange} />

        <br />

        <label>Right Text Box (Mirrored):</label>
        <input
          type="text"
          value={rightValue}
          onChange={handleRightInputChange}
        />
      </div>
    </div>
  );
};

const App = () => {
  const options = Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <View />
    </div>
  );
};

export default App;
