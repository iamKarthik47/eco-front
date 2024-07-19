import React, { useState } from 'react';
import UsersSection from './UsersSection';
import ProductsSection from './ProductsSection';
import './AdminPage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>Users</button>
        <button onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>Products</button>
      </div>
      {activeTab === 'users' && <UsersSection />}
      {activeTab === 'products' && <ProductsSection />}
    </div>
  );
};

export default AdminPage;