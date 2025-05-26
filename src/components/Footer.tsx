import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-soft py-l mt-xl">
      <div className="container mx-auto px-l">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-m md:mb-0">
            <p className="text-text-charcoal/80 text-caption">
              © {new Date().getFullYear()} MeetingSummarizer. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-2xs text-text-charcoal/80 text-caption">
            <span>Made with</span>
            <Heart size={14} className="text-accent-red fill-current" />
            <span>for productive meetings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;