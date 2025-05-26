import React from 'react';
import { Slack, Mail, BarChart2, Send } from 'lucide-react';
import { ExportDestination } from '../types';

const ExportOptions: React.FC = () => {
  const [destinations, setDestinations] = React.useState<ExportDestination[]>([
    { id: 'slack', name: 'Slack', icon: 'slack', enabled: false },
    { id: 'email', name: 'Email', icon: 'mail', enabled: false },
    { id: 'linear', name: 'Linear', icon: 'barchart', enabled: false },
    { id: 'jira', name: 'Jira', icon: 'barchart', enabled: false },
    { id: 'notion', name: 'Notion', icon: 'barchart', enabled: false },
  ]);

  const toggleDestination = (id: string) => {
    setDestinations(destinations.map(dest => 
      dest.id === id ? { ...dest, enabled: !dest.enabled } : dest
    ));
  };

  const handleExport = () => {
    const enabledDestinations = destinations.filter(dest => dest.enabled);
    if (enabledDestinations.length === 0) {
      alert('Please select at least one destination to export to.');
      return;
    }

    // In a real app, this would connect to the relevant APIs
    alert(`Exporting to: ${enabledDestinations.map(d => d.name).join(', ')}`);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'slack':
        return <Slack size={20} />;
      case 'mail':
        return <Mail size={20} />;
      case 'barchart':
        return <BarChart2 size={20} />;
      default:
        return <BarChart2 size={20} />;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {destinations.map((dest) => (
          <button
            key={dest.id}
            onClick={() => toggleDestination(dest.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200 ${
              dest.enabled
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400 text-gray-600'
            }`}
          >
            <div className={`mb-2 ${dest.enabled ? 'text-blue-600' : 'text-gray-500'}`}>
              {getIcon(dest.icon)}
            </div>
            <span className="text-sm">{dest.name}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleExport}
          className="px-6 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors duration-200 flex items-center"
        >
          <Send size={16} className="mr-2" />
          Export Selected
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;