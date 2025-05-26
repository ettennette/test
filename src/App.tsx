import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import { ActionItem, MeetingSummary, ProcessingStatus } from './types';
import { generateMockSummary } from './utils/mockData';

function App() {
  const [summary, setSummary] = useState<MeetingSummary | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>('idle');

  const handleTranscriptSubmit = (transcript: string) => {
    setStatus('processing');
    
    // Simulate AI processing time
    setTimeout(() => {
      try {
        const generatedSummary = generateMockSummary(transcript);
        setSummary(generatedSummary);
        setStatus('complete');
      } catch (error) {
        console.error('Error generating summary:', error);
        setStatus('error');
      }
    }, 2000);
  };

  const handleUpdateActionItem = (updatedItem: ActionItem) => {
    if (!summary) return;
    
    setSummary({
      ...summary,
      actionItems: summary.actionItems.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    });
  };

  const handleDeleteActionItem = (id: string) => {
    if (!summary) return;
    
    setSummary({
      ...summary,
      actionItems: summary.actionItems.filter(item => item.id !== id)
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Meeting Summary & Follow-up Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform meeting chaos into clarity. Get structured summaries, 
              action items, and follow-ups from your raw meeting notes.
            </p>
          </div>
          
          <InputSection 
            onSubmit={handleTranscriptSubmit} 
            isProcessing={status === 'processing'} 
          />
          
          {status === 'processing' && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Analyzing meeting transcript...</p>
              </div>
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <p>There was an error processing your transcript. Please try again.</p>
            </div>
          )}
          
          {status === 'complete' && summary && (
            <OutputSection 
              summary={summary}
              onUpdateActionItem={handleUpdateActionItem}
              onDeleteActionItem={handleDeleteActionItem}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;