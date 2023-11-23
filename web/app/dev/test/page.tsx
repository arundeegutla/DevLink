'use client';
import { useState, useEffect, useRef, ChangeEvent } from 'react';

interface DropdownProps {
  options: string[];
}

const Dropdown = ({ options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    console.log(`Selected: ${option}`);
    setIsOpen(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-700"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={handleToggleDropdown}>
            Select an option
          </button>
        </span>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 max-h-[200px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          <div className="py-1">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-2 py-1 border-b border-gray-300 focus:outline-none text-black"
              placeholder="Search..."
            />
            {filteredOptions.map((option) => (
              <div
                key={option}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleSelectOption(option)}>
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const options = Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Scrollable Dropdown with Search
        </h1>
        <Dropdown options={options} />
      </div>
    </div>
  );
};

export default App;
