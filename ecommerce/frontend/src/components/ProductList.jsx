import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Trash2, Edit } from 'lucide-react';

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        console.error('Erro ao deletar produto:', err);
      }
    }
  };

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="product-list">
      <h3>Lista de Produtos</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Marca</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.brand}</td>
              <td>R$ {product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => onEdit(product)} title="Editar">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(product.id)} title="Excluir" style={{ color: 'red' }}>
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
