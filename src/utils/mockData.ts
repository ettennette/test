import { MeetingSummary } from '../types';
import { v4 as uuidv4 } from '../utils/uuid';

export const generateMockSummary = (transcript: string): MeetingSummary => {
  // In a real application, this would use AI to analyze the transcript
  // For this prototype, we'll create a mock summary based on the transcript length
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Extract potential meeting title from first line
  const lines = transcript.split('\n');
  const potentialTitle = lines[0].length > 10 && lines[0].length < 100
    ? lines[0]
    : 'Product Team Weekly Sync';
  
  // Simulate extracting participants from transcript
  const commonNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'];
  const participantCount = Math.min(3 + Math.floor(transcript.length / 500), commonNames.length);
  const participants = commonNames.slice(0, participantCount);
  
  // Generate summary paragraphs
  const summaryTemplates = [
    'The meeting focused on reviewing project progress and aligning on next steps. Key discussions centered around timeline adjustments and resource allocation.',
    'Team members shared updates on their respective workstreams, highlighting both achievements and challenges. Several important decisions were made regarding technical architecture and feature prioritization.',
    'The group discussed customer feedback and its implications for the product roadmap. Market analysis and competitive positioning were also reviewed.',
    'Significant attention was given to upcoming milestones and potential risks. The team aligned on mitigation strategies and success metrics.'
  ];
  
  const summaryParagraphCount = Math.min(2 + Math.floor(transcript.length / 500), summaryTemplates.length);
  const summary = summaryTemplates.slice(0, summaryParagraphCount).join('\n\n');
  
  // Generate key points based on transcript length
  const keyPointCount = Math.min(3 + Math.floor(transcript.length / 300), 8);
  const keyPoints = [
    'Team agreed on new sprint planning process',
    'Q4 roadmap was discussed and priorities aligned',
    'User research results show positive feedback on new features',
    'Decision to delay launch by two weeks for additional testing',
    'Budget approved for additional cloud resources',
    'New hire onboarding plan reviewed and approved',
    'Customer feedback indicates need for improved documentation',
    'Competitive analysis shows opportunity in enterprise market',
  ].slice(0, keyPointCount);
  
  // Generate action items
  const actionItemTemplates = [
    {
      description: 'Update project timeline in project management tool',
      assignee: 'Alex',
      deadline: 'Next Monday'
    },
    {
      description: 'Schedule user testing sessions for new feature',
      assignee: 'Jordan',
      deadline: 'This Friday'
    },
    {
      description: 'Create first draft of product documentation',
      assignee: 'Taylor',
      deadline: 'Nov 15'
    },
    {
      description: 'Follow up with design team on UI mockups',
      assignee: 'Morgan',
      deadline: 'Tomorrow'
    },
    {
      description: 'Research competitive pricing models',
      assignee: 'Casey',
      deadline: 'Next sprint'
    }
  ];
  
  const actionItemCount = Math.min(2 + Math.floor(transcript.length / 400), actionItemTemplates.length);
  const actionItems = actionItemTemplates.slice(0, actionItemCount).map(item => ({
    ...item,
    id: uuidv4(),
    completed: false
  }));
  
  return {
    title: potentialTitle,
    date: formattedDate,
    participants,
    summary,
    keyPoints,
    actionItems
  };
};