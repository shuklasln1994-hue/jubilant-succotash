import React from 'react';
import Link from 'next/link';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const sidebarStyle = {
    width: '200px',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    minHeight: '100vh',
    borderRight: '1px solid #e0e0e0',
  };

  const navItemStyle = {
    padding: '10px 0',
    cursor: 'pointer',
    fontWeight: 'normal',
    color: '#333',
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    fontWeight: 'bold',
    color: '#007bff',
  };

  return (
    <div style={sidebarStyle}>
      <h2>Admin Menu</h2>
      <ul>
        <li style={activeTab === 'dashboard' ? activeNavItemStyle : navItemStyle} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
        <li style={activeTab === 'orders' ? activeNavItemStyle : navItemStyle} onClick={() => setActiveTab('orders')}>Orders</li>
        <li style={activeTab === 'users' ? activeNavItemStyle : navItemStyle} onClick={() => setActiveTab('users')}>Users</li>
      </ul>
    </div>
  );
};

export default AdminSidebar;