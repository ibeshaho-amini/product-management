import React from 'react';

const ProductForm = ({ form, setForm, handleSubmit, editing }) => {
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

  const handleReset = () => {
    setForm({ name: '', description: '', price: '', stock: '', image: '', imageFile: null });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{editing ? 'Edit Product' : 'Add Product'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            />
          </div>

          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Price *</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Stock *</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  required
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
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxHeight: '150px' }}
              />
            )}
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              {editing ? 'Update' : 'Add'} Product
            </button>
            {editing && (
              <button type="button" className="btn btn-secondary" onClick={handleReset}>
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
