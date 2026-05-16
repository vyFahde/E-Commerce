import React from 'react';
import { LogOut, ShoppingBag } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <ShoppingBag />
        <span>E-Commerce Admin</span>
      </div>
      <div className="navbar-actions">
        <button onClick={onLogout} className="logout-btn">
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
