export interface ActionItem {
  id: string;
  description: string;
  assignee: string;
  deadline: string;
  completed: boolean;
}

export interface MeetingSummary {
  title: string;
  date: string;
  participants: string[];
  summary: string;
  keyPoints: string[];
  actionItems: ActionItem[];
}

export interface ExportDestination {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}

export type ProcessingStatus = 'idle' | 'processing' | 'complete' | 'error';