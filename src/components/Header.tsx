import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-text-charcoal to-text-charcoal/90 text-primary-white py-m px-l shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-xs">
          <BrainCircuit size={28} className="text-accent-gold" />
          <h1 className="text-heading-m font-bold">MeetingSummarizer</h1>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-l">
            <li>
              <a 
                href="#" 
                className="text-body hover:text-accent-gold transition-colors duration-200 flex items-center"
              >
                How It Works
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-body hover:text-accent-gold transition-colors duration-200 flex items-center"
              >
                Examples
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2xs hover:bg-primary-beige/10 rounded-md">
          <div className="space-y-2xs">
            <div className="w-6 h-0.5 bg-primary-white"></div>
            <div className="w-6 h-0.5 bg-primary-white"></div>
            <div className="w-6 h-0.5 bg-primary-white"></div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;