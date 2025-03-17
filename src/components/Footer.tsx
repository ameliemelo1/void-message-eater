
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <p>The Void Discord Bot &copy; {new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
