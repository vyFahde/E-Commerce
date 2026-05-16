import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [productToEdit, setProductToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setProductToEdit(null);
    setRefreshKey(prev => prev + 1); // Trigger re-fetch
  };

  const Dashboard = () => (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Gerenciamento de Catálogo</h2>
        <button onClick={() => setShowForm(true)} className="add-btn">Novo Produto</button>
      </div>
      
      {showForm && (
        <ProductForm 
          productToEdit={productToEdit} 
          onSave={handleSave} 
          onCancel={() => { setShowForm(false); setProductToEdit(null); }} 
        />
      )}

      <ProductList key={refreshKey} onEdit={handleEdit} />
    </div>
  );

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <main>
          <Routes>
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <Register /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
