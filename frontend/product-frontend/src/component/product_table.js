import React from 'react';

const ProductTable = ({ products, handleEdit, handleDelete }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Products List ({products.length})</h5>
      </div>
      <div className="card-body">
        {products.length === 0 ? (
          <p className="text-muted text-center py-4">No products found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="fw-bold">{product.id}</td>

                    {/* Image column */}
                    <td>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-thumbnail"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      ) : (
                        <span className="text-muted">No image</span>
                      )}
                    </td>

                    <td>{product.name}</td>
                    <td className="text-muted small">{product.description || '-'}</td>
                    <td>${parseFloat(product.price).toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge ${
                          product.stock > 10
                            ? 'bg-success'
                            : product.stock > 0
                            ? 'bg-warning'
                            : 'bg-danger'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
