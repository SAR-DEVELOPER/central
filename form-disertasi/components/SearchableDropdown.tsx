"use client";

import React, { useState, useRef, useEffect } from "react";

interface SearchableDropdownProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function SearchableDropdown({
  id,
  value,
  onChange,
  options,
  placeholder = "Pilih atau cari...",
  required = false,
  className = "",
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    // Allow free text input, but also update the value
    onChange(newValue);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setSearchTerm(value);
  };

  const handleInputBlur = () => {
    // Delay to allow click events to register
    setTimeout(() => {
      setIsOpen(false);
      // If value doesn't match any option, keep it as is (free text)
      if (value && !options.includes(value)) {
        setSearchTerm("");
      } else {
        setSearchTerm("");
      }
    }, 200);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <input
        ref={inputRef}
        id={id}
        type="text"
        required={required}
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-200"
        autoComplete="off"
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-xl border border-slate-300 bg-white shadow-lg">
          {filteredOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-2 text-left text-sm text-slate-900 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${
                value === option ? "bg-blue-100" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {isOpen && searchTerm && filteredOptions.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-slate-300 bg-white shadow-lg px-4 py-2 text-sm text-slate-600">
          Tidak ada hasil ditemukan
        </div>
      )}
    </div>
  );
}


