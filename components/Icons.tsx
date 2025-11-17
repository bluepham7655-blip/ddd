
import React from 'react';

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
  </svg>
);

export const DocxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#295394" />
    <path d="M14 2V8H20" fill="#1E3C6C" />
    <path d="M12.87 14.33H11.53L10.38 17.33H9.27L10.97 12H12.22L13.92 17.33H12.81L11.66 14.33H12.87Z" fill="white" />
  </svg>
);

export const PdfIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#E53E3E" />
    <path d="M14 2V8H20" fill="#C53030" />
    <path d="M8.5 16.5V12H9.5V13.5H11C11.85 13.5 12.5 14.15 12.5 15C12.5 15.85 11.85 16.5 11 16.5H8.5ZM9.5 15.5H11C11.3 15.5 11.5 15.3 11.5 15C11.5 14.7 11.3 14.5 11 14.5H9.5V15.5Z" fill="white" />
  </svg>
);