import React, { useState } from 'react';
import { FileUp, X, RefreshCw } from 'lucide-react';

interface InputSectionProps {
  onSubmit: (transcript: string) => void;
  isProcessing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isProcessing }) => {
  const [transcript, setTranscript] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim() && !isProcessing) {
      onSubmit(transcript);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setTranscript(event.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setTranscript(event.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  return (
    <div className="card mb-l">
      <h2 className="text-heading-m mb-m text-text-charcoal">Meeting Input</h2>
      <form onSubmit={handleSubmit}>
        <div 
          className={`relative border-2 ${
            isDragging 
              ? 'border-accent-blue bg-primary-soft' 
              : 'border-border-light'
          } border-dashed rounded-lg p-m mb-m transition-all duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <textarea
            className="w-full h-64 p-s bg-transparent focus:outline-none resize-none text-body"
            placeholder="Paste your meeting transcript or notes here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={isProcessing}
          />
          
          {transcript && (
            <button 
              type="button" 
              className="absolute top-s right-s text-text-charcoal/60 hover:text-accent-red transition-colors duration-200"
              onClick={clearTranscript}
            >
              <X size={18} />
            </button>
          )}
          
          <div className="flex justify-center mt-s">
            <div className="flex items-center justify-center">
              <p className="text-caption text-text-charcoal/60 mr-s">or</p>
              <label className="flex items-center px-m py-s bg-primary-soft text-text-charcoal rounded-md cursor-pointer hover:bg-primary-beige transition-colors duration-200">
                <FileUp size={16} className="mr-2xs" />
                <span className="text-body">Upload File</span>
                <input type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" onChange={handleFileInput} />
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-caption text-text-charcoal/60">
            {transcript ? `${transcript.length} characters` : 'No content yet'}
          </div>
          <button
            type="submit"
            className={`btn-primary flex items-center ${
              isProcessing || !transcript.trim()
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={isProcessing || !transcript.trim()}
          >
            {isProcessing ? (
              <>
                <RefreshCw size={16} className="mr-2xs animate-spin" />
                Processing...
              </>
            ) : (
              'Generate Summary'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputSection;