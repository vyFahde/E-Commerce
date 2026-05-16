import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const ProductForm = ({ productToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    stock: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        brand: productToEdit.brand || '',
        stock: productToEdit.stock || 0
      });
    } else {
      setFormData({ name: '', description: '', price: '', brand: '', stock: '' });
    }
  }, [productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit) {
        await api.put(`/products/${productToEdit.id}`, formData);
      } else {
        await api.post('/products', formData);
      }
      onSave();
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
    }
  };

  return (
    <div className="product-form">
      <h3>{productToEdit ? 'Editar Produto' : 'Novo Produto'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
          />
        </div>
        <div>
          <label>Marca:</label>
          <input 
            type="text" 
            value={formData.brand} 
            onChange={(e) => setFormData({...formData, brand: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label>Preço:</label>
          <input 
            type="number" 
            step="0.01"
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label>Quantidade em Estoque:</label>
          <input 
            type="number" 
            value={formData.stock} 
            onChange={(e) => setFormData({...formData, stock: e.target.value})} 
            required 
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Salvar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
