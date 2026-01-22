// import React from 'react';

// const ProductForm = ({ form, setForm, handleSubmit, editing }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

 
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
     
//       const imageUrl = URL.createObjectURL(file);
//       setForm((prev) => ({ ...prev, imageFile: file, image: imageUrl }));
//     }
//   };

//   const handleReset = () => {
//     setForm({ name: '', description: '', price: '', stock: '', image: '', imageFile: null });
//   };

//   return (
//     <div className="card shadow-sm">
//       <div className="card-header bg-primary text-white">
//         <h5 className="mb-0">{editing ? 'Edit Product' : 'Add Product'}</h5>
//       </div>
//       <div className="card-body">
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="mb-3">
//             <label className="form-label">Name *</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Product name"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Product description"
//               rows="3"
//             />
//           </div>

//           <div className="row">
//             <div className="col-6">
//               <div className="mb-3">
//                 <label className="form-label">Price *</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   name="price"
//                   value={form.price}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   step="0.01"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="col-6">
//               <div className="mb-3">
//                 <label className="form-label">Stock *</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   name="stock"
//                   value={form.stock}
//                   onChange={handleChange}
//                   placeholder="0"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="mb-3">
//             <label className="form-label">Product Image</label>
//             <input
//               type="file"
//               className="form-control"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//             {form.image && (
//               <img
//                 src={form.image}
//                 alt="Preview"
//                 className="img-thumbnail mt-2"
//                 style={{ maxHeight: '150px' }}
//               />
//             )}
//           </div>

//           <div className="d-grid gap-2">
//             <button type="submit" className="btn btn-primary">
//               {editing ? 'Update' : 'Add'} Product
//             </button>
//             {editing && (
//               <button type="button" className="btn btn-secondary" onClick={handleReset}>
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;


import React, { useState } from 'react';
import { createProduct, updateProduct } from '../api/product_api';

const ProductForm = ({ form, setForm, handleSubmit, editing, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, imageFile: file, image: imageUrl }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!form.name || !form.price || form.stock === '') {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description || '');
      formData.append('price', form.price);
      formData.append('stock', form.stock);
      
      // Add image if selected
      if (form.imageFile) {
        formData.append('image', form.imageFile);
      }

      let response;

      if (editing) {
        // Update existing product
        response = await updateProduct(editing, formData);
        setSuccess('Product updated successfully!');
      } else {
        // Create new product
        response = await createProduct(formData);
        setSuccess('Product created successfully!');
      }

      // Reset form
      setForm({ name: '', description: '', price: '', stock: '', image: '', imageFile: null });

      // Call onSuccess callback if provided (for Dashboard)
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }

      // Call handleSubmit if provided
      if (handleSubmit) {
        handleSubmit({ preventDefault: () => {} });
      }

    } catch (err) {
      console.error('Error:', err);
      
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError('Failed to save product. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', description: '', price: '', stock: '', image: '', imageFile: null });
    setError('');
    setSuccess('');
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{editing ? 'Edit Product' : 'Add Product'}</h5>
      </div>
      <div className="card-body">
        {/* Error Message */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccess('')}
            ></button>
          </div>
        )}

        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Name *</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description"
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Price * ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Stock * (units)</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxHeight: '150px', objectFit: 'cover' }}
              />
            )}
          </div>

          <div className="d-grid gap-2">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {editing ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                `${editing ? 'Update' : 'Add'} Product`
              )}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;