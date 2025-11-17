
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
        Scientific Document <span className="text-blue-600 dark:text-blue-500">Translator</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
        Translate Vietnamese scientific papers to English while perfectly preserving all formulas, equations, and formatting.
      </p>
    </header>
  );
};