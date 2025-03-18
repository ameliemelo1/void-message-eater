
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border">
      <div className="container">
        <p className="text-sm text-muted-foreground">The Void Discord Bot &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
