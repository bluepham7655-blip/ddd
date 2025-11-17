
import React from 'react';
import type { OutputFormat } from '../types';
import { DocxIcon, PdfIcon } from './Icons';

interface OptionsSelectorProps {
  selectedFormat: OutputFormat;
  onFormatChange: (format: OutputFormat) => void;
}

export const OptionsSelector: React.FC<OptionsSelectorProps> = ({ selectedFormat, onFormatChange }) => {
  const options: { id: OutputFormat; label: string; icon: React.ReactNode }[] = [
    { id: 'docx', label: 'Word (.docx)', icon: <DocxIcon className="w-8 h-8" /> },
    { id: 'pdf', label: 'PDF (.pdf)', icon: <PdfIcon className="w-8 h-8" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedFormat === option.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-600'
          }`}
        >
          <input
            type="radio"
            name="format-option"
            value={option.id}
            checked={selectedFormat === option.id}
            onChange={() => onFormatChange(option.id)}
            className="sr-only"
          />
          {option.icon}
          <span className="ml-4 text-lg font-medium text-gray-800 dark:text-gray-200">{option.label}</span>
        </label>
      ))}
    </div>
  );
};