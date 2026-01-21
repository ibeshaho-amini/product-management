
import React, { useEffect, useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/product_api';

import ProductForm from '../component/product_form';
import ProductTable from '../component/product_table';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct(editingId, form);
      } else {
        await createProduct(form);
      }
      setForm({ name: '', description: '', price: '', stock: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setEditingId(product.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="mb-4">
          <h1 className="display-5 fw-bold text-dark mb-2">Product Management</h1>
          <p className="text-muted">Create, update, and manage your products</p>
        </div>
        
        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <ProductForm 
              form={form} 
              setForm={setForm} 
              handleSubmit={handleSubmit} 
              editing={editingId}
            />
          </div>
          <div className="col-lg-8 col-md-7">
            <ProductTable 
              products={products} 
              handleEdit={handleEdit} 
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;