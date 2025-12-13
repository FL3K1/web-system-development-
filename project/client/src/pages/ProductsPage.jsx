import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import ProductGallery from '../components/ProductGallery'; 

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', stock: '' });
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [editingId, setEditingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
    checkRole();
  }, []);

  const checkRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === 'admin') setIsAdmin(true);
      } catch (error) {
        console.error("Token inválido");
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/products');
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  // Limpieza del formulario
  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', stock: '' });
    setEditingId(null);
    setSelectedFiles([]);
    
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem('token');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);

    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append('images', selectedFiles[i]);
      }
    }

    try {
      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      };

      if (editingId) {
        await axios.put(`http://localhost:3000/products/${editingId}`, data, config);
        alert('Producto actualizado con éxito');
      } else {
        await axios.post('http://localhost:3000/products', data, config);
        alert('Producto creado con éxito');
      }

      resetForm(); 
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert('Error al guardar: ' + (error.response?.data?.error || "Error desconocido"));
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormData({ 
      name: product.name, 
      price: product.price, 
      description: product.description, 
      stock: product.stock 
    });
    setSelectedFiles([]); 
    setShowForm(true); 
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres borrar este producto?")) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      alert('Error al borrar');
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0 }}>Catálogo de Productos</h2>
        {isAdmin && (
          <button 
            onClick={() => { 
              if (!showForm) resetForm(); 
              setShowForm(!showForm); 
            }} 
            style={{ 
              background: showForm ? '#6c757d' : '#28a745',
              padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            {showForm ? 'Cerrar Panel' : '➕ Añadir Producto'}
          </button>
        )}
      </div>

      {isAdmin && showForm && (
        <div className="card" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '30px', borderLeft: '5px solid #28a745' }}>
          <h3 style={{ marginTop: 0 }}>{editingId ? '✏️ Editando Producto' : '📦 Nueva Prenda'}</h3>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label>Nombre</label>
                <input 
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label>Precio (€)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <label>Descripción</label>
            <input 
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />

            <label>Stock</label>
            <input 
              type="number" 
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              value={formData.stock} 
              onChange={e => setFormData({...formData, stock: e.target.value})} 
            />

            <div style={{ marginTop: '15px', padding: '15px', background: '#f8f9fa', border: '2px dashed #ced4da', borderRadius: '5px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
                📸 Fotos del producto:
              </label>
              
              <input 
                id="fileInput"
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFileChange} 
                style={{ marginBottom: '10px' }}
              />
              
              <p style={{ margin: 0, fontSize: '0.9rem', color: selectedFiles.length > 0 ? '#28a745' : '#6c757d' }}>
                {selectedFiles.length > 0 
                  ? `✅ Has seleccionado ${selectedFiles.length} fotos` 
                  : "ℹ️ Puedes seleccionar varias fotos a la vez (Ctrl + Clic)"}
              </p>
            </div>

            <button 
              type="submit" 
              style={{ 
                width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1rem', marginTop: '20px', cursor: 'pointer'
              }}
            >
              {editingId ? 'Actualizar Datos' : 'Guardar Producto'}
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {products.map(p => {
          const imagesToShow = (p.gallery && p.gallery.length > 0) 
            ? p.gallery 
            : (p.image_url ? [p.image_url] : ["https://via.placeholder.com/300?text=Sin+Foto"]);

          return (
            <div key={p.id} className="card" style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              
              <div style={{ marginBottom: '15px', height: '320px', display: 'flex', justifyContent: 'center' }}>
                 <ProductGallery images={imagesToShow} />
              </div>

              <h3 style={{ margin: '10px 0', fontSize: '1.2rem' }}>{p.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{p.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#007bff' }}>{p.price} €</span>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>Stock: {p.stock}</span>
              </div>

              {isAdmin ? (
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEditClick(p)} style={{ flex: 1, background: '#ffc107', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(p.id)} style={{ flex: 1, background: '#dc3545', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>Borrar</button>
                </div>
              ) : (
                <button style={{ width: '100%', marginTop: '15px', background: '#333', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Añadir al Carrito 🛒
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsPage;