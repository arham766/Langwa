import React from 'react';
import LangwaLanding from './components/LangwaLanding';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <LangwaLanding />
      </div>
    </ErrorBoundary>
  );
}

export default App;
