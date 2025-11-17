
import type { ProcessingStep } from "./types";

export const STEPS: { id: ProcessingStep, name: string }[] = [
  { id: 'extracting', name: 'Extracting Content' },
  { id: 'translating', name: 'Translating Text' },
  { id: 'reconstructing', name: 'Reconstructing Document' },
  { id: 'complete', name: 'Done' }
];