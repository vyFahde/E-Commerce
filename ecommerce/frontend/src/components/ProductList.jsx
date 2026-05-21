import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Trash2, Edit, ShoppingCart } from 'lucide-react';

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchData = async () => {
    try {
      const [productsRes, userRes] = await Promise.all([
        api.get('/products'),
        api.get('/customers/me')
      ]);
      setProducts(productsRes.data);
      setCurrentUser(userRes.data);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleBuy = async (productId) => {
    if (!currentUser) return;
    try {
      await api.post(`/customers/${currentUser.id}/products/${productId}`);
      alert('Produto adicionado à sua lista de compras!');
    } catch (err) {
      console.error('Erro ao comprar produto:', err);
      alert('Falha ao processar compra.');
    }
  };

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="product-list">
      <h3>Lista de Produtos</h3>
      {currentUser && <p>Bem-vindo, <strong>{currentUser.name}</strong>!</p>}
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
              <td className="actions-cell">
                <button onClick={() => onEdit(product)} title="Editar" className="icon-btn">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleBuy(product.id)} title="Comprar" className="icon-btn buy-btn">
                  <ShoppingCart size={18} />
                </button>
                <button onClick={() => handleDelete(product.id)} title="Excluir" className="icon-btn delete-btn">
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
