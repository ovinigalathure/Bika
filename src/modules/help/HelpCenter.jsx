// profile/HelpCenter.jsx
import React from 'react';
import './helpCenter.css';
import HelpTable from './components/HelpTable';

const HelpCenter = () => {
  return (
    <div className="help-center-container">
      <header className="help-header">
        <h1>Help Center</h1>
      </header>
      <HelpTable />
    </div>
  );
};

export default HelpCenter;
