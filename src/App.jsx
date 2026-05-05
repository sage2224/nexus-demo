import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MobileFrame from './components/MobileFrame';

function App() {
  const [activeTab, setActiveTab] = useState('time-to-value');
  const [resetKey, setResetKey] = useState(0);

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'time-to-value':
        return 'Demo "Time to value flow"';
      case 'interaction':
        return 'Tương tác điển hình';
      case 'design-style':
        return 'Phong cách thiết kế';
      default:
        return 'SSI Nexus Demo';
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <header className="header" style={{ justifyContent: 'space-between' }}>
          <h1 className="header-title">{getHeaderTitle()}</h1>
          
          {activeTab !== 'design-style' && (
            <button 
              onClick={() => setResetKey(prev => prev + 1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 500,
                color: '#333333',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            >
              <RotateCcw size={16} />
              Reset Flow
            </button>
          )}
        </header>
        
        <div className="content-area">
          <MobileFrame key={resetKey} activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
}

export default App;
