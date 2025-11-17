import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { OptionsSelector } from './components/OptionsSelector';
import { ProgressBar } from './components/ProgressBar';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { translateScientificText } from './services/geminiService';
import type { OutputFormat, ProcessingStep } from './types';
import { STEPS } from './constants';

// Declare the pdfjsLib global object provided by the script in index.html
declare const pdfjsLib: any;

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('docx');
  const [currentStep, setCurrentStep] = useState<ProcessingStep | 'idle'>('idle');
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    resetState();
  };

  const resetState = () => {
    setCurrentStep('idle');
    setTranslatedText(null);
    setError(null);
    setIsLoading(false);
  };

  const extractTextFromPdf = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          if (!event.target?.result) {
            return reject(new Error("File reading failed."));
          }
          const typedArray = new Uint8Array(event.target.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n\n'; // Add newlines between pages for structure
          }
          resolve(fullText);
        } catch (error) {
          reject(new Error("Could not parse the PDF file."));
        }
      };
      reader.onerror = (error) => reject(new Error("Failed to read the file."));
      reader.readAsArrayBuffer(file);
    });
  };

  const startTranslation = useCallback(async () => {
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('For this demonstration, only PDF file translation is supported. DOCX processing is not yet implemented.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranslatedText(null);

    try {
      setCurrentStep('extracting');
      const originalText = await extractTextFromPdf(file);
      
      if (!originalText.trim()) {
        throw new Error("Could not extract any text from the PDF. The file might be empty or contain only images.");
      }

      setCurrentStep('translating');
      const result = await translateScientificText(originalText);
      setTranslatedText(result);

      setCurrentStep('reconstructing');
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause for UX

      setCurrentStep('complete');
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during translation. Please try again.';
      setError(errorMessage);
      setCurrentStep('idle');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  const handleDownload = () => {
    if (!translatedText) return;
    const blob = new Blob([translatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated_${file?.name.split('.').slice(0, -1).join('.') || 'document'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isButtonDisabled = !file || isLoading;

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 flex flex-col items-center p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-8 transition-colors duration-300">
          <section>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">1. Upload Document</h2>
            <FileUpload onFileChange={handleFileChange} />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">2. Select Output Format</h2>
            <OptionsSelector selectedFormat={outputFormat} onFormatChange={setOutputFormat} />
          </section>

          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          <section className="text-center">
            <button
              onClick={startTranslation}
              disabled={isButtonDisabled}
              className={`w-full sm:w-auto px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out
                ${isButtonDisabled
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transform hover:-translate-y-1 hover:shadow-2xl'}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : 'Translate Document'}
            </button>
          </section>

          {currentStep !== 'idle' && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">3. Progress</h2>
              <ProgressBar steps={STEPS} currentStep={currentStep} />
            </section>
          )}

          {error && <div className="text-red-500 text-center p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">{error}</div>}

          {currentStep === 'complete' && translatedText && (
            <ResultDisplay
              translatedText={translatedText}
              onDownload={handleDownload}
              outputFormat={outputFormat}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
