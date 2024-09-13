import MenuIcon from "./MenuIcon";
import { useState, useRef, useEffect } from "react";

function ColumnDropdown({ actions }: { actions: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpen = (value: boolean) => {
    setIsOpen(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left"
    >
      <button
        onClick={() => handleOpen(!isOpen)}
        className="inline-flex text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        <MenuIcon className="w-5 h-5" />
      </button>

      <div
        className={`${isOpen
          ? "transform opacity-100 scale-100"
          : "transform opacity-0 scale-95 pointer-events-none"
          } transition ease-out duration-100 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
      >
        <div className="py-1">
          <button onClick={() => actions.setMode(true)} className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            Change title
          </button>
          <button onClick={actions.delete} className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            Delete column
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColumnDropdown;
