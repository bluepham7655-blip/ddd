import React from 'react';
import type { OutputFormat } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ResultDisplayProps {
  translatedText: string;
  onDownload: () => void;
  outputFormat: OutputFormat;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ translatedText, onDownload, outputFormat }) => {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">4. Translation Complete</h2>
        <button
          onClick={onDownload}
          className="px-6 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
        >
          Download .{outputFormat}
        </button>
      </div>
      <div className="p-8 bg-white dark:bg-gray-100 text-gray-900 rounded-lg shadow-xl max-h-[70vh] overflow-y-auto w-full mx-auto" style={{ maxWidth: '8.5in' }}>
        <MarkdownRenderer content={translatedText} />
      </div>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        Note: The download is a .txt file for demonstration purposes. A full implementation would generate a formatted {outputFormat.toUpperCase()} document.
      </p>
    </section>
  );
};