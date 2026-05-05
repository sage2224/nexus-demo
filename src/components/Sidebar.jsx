import React from 'react';
import { Layers, Zap, Smartphone, PlayCircle } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    {
      id: 'design-style',
      label: 'Phong cách thiết kế',
      icon: <Layers size={20} />
    },
    {
      id: 'time-to-value',
      label: 'Demo "Time to value flow"',
      icon: <PlayCircle size={20} />
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Smartphone size={24} />
        </div>
        <div className="logo-text">SSI Nexus Demo</div>
      </div>
      
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
