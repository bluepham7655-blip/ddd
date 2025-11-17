
import React, { useState, useCallback } from 'react';
import { DocxIcon, PdfIcon, UploadIcon } from './Icons';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File | null) => {
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFileName(file.name);
      onFileChange(file);
    } else {
      alert('Please upload a valid PDF or Word (.docx) file.');
      setFileName(null);
      onFileChange(null);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files ? event.target.files[0] : null);
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    handleFileSelect(event.dataTransfer.files ? event.dataTransfer.files[0] : null);
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const getFileIcon = () => {
    if (!fileName) return <UploadIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />;
    if (fileName.endsWith('.pdf')) return <PdfIcon className="w-12 h-12 mb-2" />;
    if (fileName.endsWith('.docx')) return <DocxIcon className="w-12 h-12 mb-2" />;
    return <UploadIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />;
  };

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
        ${isDragOver 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
        {getFileIcon()}
        {fileName ? (
          <p className="font-semibold text-gray-700 dark:text-gray-200">{fileName}</p>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOCX</p>
          </>
        )}
      </div>
      <input id="dropzone-file" type="file" className="hidden" onChange={handleInputChange} accept=".pdf,.docx" />
    </label>
  );
};