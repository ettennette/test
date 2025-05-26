import React, { useState } from 'react';
import { Copy, CheckCircle, Download, Send } from 'lucide-react';
import ActionItems from './ActionItems';
import ExportOptions from './ExportOptions';
import { ActionItem, MeetingSummary } from '../types';

interface OutputSectionProps {
  summary: MeetingSummary | null;
  onUpdateActionItem: (updatedItem: ActionItem) => void;
  onDeleteActionItem: (id: string) => void;
}

const OutputSection: React.FC<OutputSectionProps> = ({ 
  summary, 
  onUpdateActionItem,
  onDeleteActionItem
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!summary) return;
    
    const summaryText = `
# ${summary.title}
Date: ${summary.date}
Participants: ${summary.participants.join(', ')}

## Summary
${summary.summary}

## Key Points
${summary.keyPoints.map(point => `- ${point}`).join('\n')}

## Action Items
${summary.actionItems.map(item => 
  `- ${item.description} (Assignee: ${item.assignee}, Deadline: ${item.deadline})`
).join('\n')}
    `.trim();
    
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (!summary) return;
    
    const summaryText = `
# ${summary.title}
Date: ${summary.date}
Participants: ${summary.participants.join(', ')}

## Summary
${summary.summary}

## Key Points
${summary.keyPoints.map(point => `- ${point}`).join('\n')}

## Action Items
${summary.actionItems.map(item => 
  `- ${item.description} (Assignee: ${item.assignee}, Deadline: ${item.deadline})`
).join('\n')}
    `.trim();
    
    const blob = new Blob([summaryText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${summary.title.replace(/\s+/g, '_')}_summary.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!summary) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Meeting Summary</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors flex items-center rounded-md hover:bg-gray-100"
            title="Copy to clipboard"
          >
            {copied ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : (
              <Copy size={18} />
            )}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors flex items-center rounded-md hover:bg-gray-100"
            title="Download as Markdown"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{summary.title}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
          <div>Date: {summary.date}</div>
          <div>Participants: {summary.participants.join(', ')}</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
        <div className="prose prose-sm max-w-none">
          {summary.summary.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Points</h3>
        <ul className="space-y-2">
          {summary.keyPoints.map((point, index) => (
            <li key={index} className="flex">
              <span className="w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <ActionItems 
        actionItems={summary.actionItems}
        onUpdateActionItem={onUpdateActionItem}
        onDeleteActionItem={onDeleteActionItem}
      />

      <div className="border-t border-gray-200 mt-8 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Share Results</h3>
        <ExportOptions />
      </div>
    </div>
  );
};

export default OutputSection;