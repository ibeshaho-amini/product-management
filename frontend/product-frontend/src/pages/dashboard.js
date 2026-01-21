// // Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { getProducts, deleteProduct } from '../api/product_api';
// import ProductTable from '../component/product_table';
// import ProductForm from '../component/product_form';

// const Dashboard = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
//   const [editingId, setEditingId] = useState(null);

//   const fetchProducts = async () => {
//     try {
//       const res = await getProducts();
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Calculate summaries
//   const totalProducts = products.length;
//   const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
//   const totalValue = products.reduce((sum, product) => sum + (parseFloat(product.price) * product.stock), 0);
//   const lowStockItems = products.filter(product => product.stock < 10).length;
//   const highValueProducts = products.filter(product => parseFloat(product.price) > 500).length;

//   const handleAddClick = () => {
//     setShowForm(true);
//     setForm({ name: '', description: '', price: '', stock: '' });
//     setEditingId(null);
//   };

//   const handleEdit = (product) => {
//     setForm({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       stock: product.stock,
//     });
//     setEditingId(product.id);
//     setShowForm(true);
//     window.scrollTo(0, 0);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteProduct(id);
//         fetchProducts();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setForm({ name: '', description: '', price: '', stock: '' });
//     setEditingId(null);
//   };

//   return (
//     <div className="d-flex min-vh-100" style={{ background: '#f5f7fa' }}>
//       {/* Sidebar */}
//       <div style={{
//         width: '270px',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         color: 'white',
//         padding: '30px 20px',
//         minHeight: '100vh',
//         position: 'sticky',
//         top: 0,
//         boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
//       }}>
//         <h2 className="fw-bold mb-5" style={{ fontSize: '1.8rem' }}>📦 PMS</h2>
        
//         <nav className="d-flex flex-column gap-2">
//           <button 
//             className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-3 text-start" 
//             style={{
//               background: 'rgba(255,255,255,0.2)',
//               borderRadius: '8px',
//               border: 'none',
//               transition: 'all 0.3s ease',
//               cursor: 'pointer',
//               fontSize: '1rem'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
//               e.currentTarget.style.transform = 'translateX(5px)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
//               e.currentTarget.style.transform = 'translateX(0)';
//             }}
//           >
//             <span style={{ fontSize: '1.3rem' }}>📊</span>
//             <span className="fw-500">Dashboard</span>
//           </button>
          
//           <button 
//             onClick={handleAddClick}
//             className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-3 text-start"
//             style={{
//               background: 'rgba(255,255,255,0.1)',
//               borderRadius: '8px',
//               border: 'none',
//               transition: 'all 0.3s ease',
//               cursor: 'pointer',
//               fontSize: '1rem'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
//               e.currentTarget.style.transform = 'translateX(5px)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
//               e.currentTarget.style.transform = 'translateX(0)';
//             }}
//           >
//             <span style={{ fontSize: '1.3rem' }}>➕</span>
//             <span className="fw-500">Add Product</span>
//           </button>

//           <button 
//             className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-3 text-start"
//             style={{
//               background: 'rgba(255,255,255,0.1)',
//               borderRadius: '8px',
//               border: 'none',
//               transition: 'all 0.3s ease',
//               cursor: 'pointer',
//               fontSize: '1rem'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
//               e.currentTarget.style.transform = 'translateX(5px)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
//               e.currentTarget.style.transform = 'translateX(0)';
//             }}
//           >
//             <span style={{ fontSize: '1.3rem' }}>⚙️</span>
//             <span className="fw-500">Settings</span>
//           </button>
//         </nav>

//         <div className="mt-auto pt-5" style={{ marginTop: 'auto' }}>
//           <hr className="border-white-50" />
//           <p className="small text-white-50 mb-0">© 2024 PMS</p>
//           <p className="small text-white-50">All Rights Reserved</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={{ flex: 1, overflow: 'auto' }}>
//         <div style={{ padding: '40px' }}>
//           {/* Top Header */}
//           <div className="d-flex justify-content-between align-items-center mb-5">
//             <div>
//               <h1 className="h2 fw-bold text-dark mb-1">Dashboard</h1>
//               <p className="text-muted mb-0">Welcome to your product management system</p>
//             </div>
//             <button className="btn btn-danger px-4">Logout</button>
//           </div>

//           {/* Add Product Form Modal */}
//           {showForm && (
//             <div style={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: 'rgba(0,0,0,0.5)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               zIndex: 1000,
//               padding: '20px'
//             }}>
//               <div style={{
//                 background: 'white',
//                 borderRadius: '12px',
//                 width: '100%',
//                 maxWidth: '500px',
//                 maxHeight: '90vh',
//                 overflow: 'auto',
//                 boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
//               }}>
//                 <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
//                   <h5 className="mb-0 fw-bold">{editingId ? 'Edit Product' : 'Add New Product'}</h5>
//                   <button 
//                     onClick={handleCloseForm}
//                     className="btn btn-sm btn-light"
//                   >
//                     ✕
//                   </button>
//                 </div>
//                 <div style={{ padding: '30px 20px' }}>
//                   <ProductForm 
//                     form={form} 
//                     setForm={setForm} 
//                     handleSubmit={async (e) => {
//                       e.preventDefault();
//                       // Handle submit logic here
//                       handleCloseForm();
//                       fetchProducts();
//                     }}
//                     editing={editingId}
//                     onCancel={handleCloseForm}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Summary Cards */}
//           <div className="row g-4 mb-5">
//             <div className="col-lg-3 col-md-6">
//               <div className="card border-0 shadow-sm" style={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: 'white',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-5px)';
//                 e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
//               }}
//               >
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between align-items-start">
//                     <div>
//                       <p className="text-white-50 small mb-2">Total Products</p>
//                       <h3 className="fw-bold mb-0" style={{ fontSize: '2rem' }}>{totalProducts}</h3>
//                     </div>
//                     <span style={{ fontSize: '2.5rem' }}>📦</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-3 col-md-6">
//               <div className="card border-0 shadow-sm" style={{
//                 background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                 color: 'white',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-5px)';
//                 e.currentTarget.style.boxShadow = '0 10px 25px rgba(245, 87, 108, 0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
//               }}
//               >
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between align-items-start">
//                     <div>
//                       <p className="text-white-50 small mb-2">Total Stock</p>
//                       <h3 className="fw-bold mb-0" style={{ fontSize: '2rem' }}>{totalStock}</h3>
//                     </div>
//                     <span style={{ fontSize: '2.5rem' }}>📊</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-3 col-md-6">
//               <div className="card border-0 shadow-sm" style={{
//                 background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//                 color: 'white',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-5px)';
//                 e.currentTarget.style.boxShadow = '0 10px 25px rgba(79, 172, 254, 0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
//               }}
//               >
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between align-items-start">
//                     <div>
//                       <p className="text-white-50 small mb-2">Low Stock</p>
//                       <h3 className="fw-bold mb-0" style={{ fontSize: '2rem' }}>{lowStockItems}</h3>
//                     </div>
//                     <span style={{ fontSize: '2.5rem' }}>⚠️</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-3 col-md-6">
//               <div className="card border-0 shadow-sm" style={{
//                 background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
//                 color: 'white',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-5px)';
//                 e.currentTarget.style.boxShadow = '0 10px 25px rgba(250, 112, 154, 0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
//               }}
//               >
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between align-items-start">
//                     <div>
//                       <p className="text-white-50 small mb-2">Total Value</p>
//                       <h3 className="fw-bold mb-0" style={{ fontSize: '2rem' }}>${totalValue.toFixed(0)}</h3>
//                     </div>
//                     <span style={{ fontSize: '2.5rem' }}>💰</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Button Section */}
//           <div className="mb-4 d-flex justify-content-between align-items-center">
//             <h5 className="fw-bold mb-0">Products Inventory</h5>
//             <button 
//               onClick={handleAddClick}
//               className="btn btn-primary fw-bold px-4 py-2"
//               style={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 border: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'scale(1.05)';
//                 e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.boxShadow = 'none';
//               }}
//             >
//               ➕ Add New Product
//             </button>
//           </div>

//           {/* Products Table */}
//           <div>
//             <ProductTable 
//               products={products} 
//               handleEdit={handleEdit} 
//               handleDelete={handleDelete}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// Dashboard.jsx - FIXED

import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../api/product_api';
import ProductTable from '../component/product_table';
import ProductForm from '../component/product_form';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
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

  // Calculate summaries
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalValue = products.reduce((sum, product) => sum + (parseFloat(product.price) * product.stock), 0);
  const lowStockItems = products.filter(product => product.stock < 10).length;
  // Removed: const highValueProducts = products.filter(product => parseFloat(product.price) > 500).length;

  const handleAddClick = () => {
    setShowForm(true);
    setForm({ name: '', description: '', price: '', stock: '' });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setForm({ name: '', description: '', price: '', stock: '' });
    setEditingId(null);
  };

  return (
    <div className="d-flex min-vh-100" style={{ background: '#f5f7fa' }}>
      {/* Sidebar */}
      <div style={{
        width: '270px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px 20px',
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 className="fw-bold mb-5" style={{ fontSize: '1.8rem' }}>📦 PMS</h2>
        
        <nav className="d-flex flex-column gap-2">
          <button 
            className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-3 text-start" 
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              border: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>📊</span>
            <span className="fw-500">Dashboard</span>
          </button>
          
          <button 
            onClick={handleAddClick}
            className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-3 text-start"
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              border: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>➕</span>
            <span className="fw-500">Add Product</span>
          </button>

          <button 
            className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-3 text-start"
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              border: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>⚙️</span>
            <span className="fw-500">Settings</span>
          </button>
        </nav>

        <div className="mt-auto pt-5" style={{ marginTop: 'auto' }}>
          <hr className="border-white-50" />
          <p className="small text-white-50 mb-0">© 2025 amini</p>
          <p className="small text-white-50">All Rights Reserved</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: '40px' }}>
          {/* Top Header */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h1 className="h2 fw-bold text-dark mb-1">Dashboard</h1>
              <p className="text-muted mb-0">Welcome to your product management system</p>
            </div>
            <button className="btn btn-danger px-4">Logout</button>
          </div>

          {/* Add Product Form Modal */}
          {showForm && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
              }}>
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                  <h5 className="mb-0 fw-bold">{editingId ? 'Edit Product' : 'Add New Product'}</h5>
                  <button 
                    onClick={handleCloseForm}
                    className="btn btn-sm btn-light"
                  >
                    ✕
                  </button>
                </div>
                <div style={{ padding: '30px 20px' }}>
                  <ProductForm 
                    form={form} 
                    setForm={setForm} 
                    handleSubmit={async (e) => {
                      e.preventDefault();
                      // Handle submit logic here
                      handleCloseForm();
                      fetchProducts();
                    }}
                    editing={editingId}
                    onCancel={handleCloseForm}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Summary Cards */}
          <div className="row g-4 mb-5">
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-white-50 small mb-2">Total Products</p>
                      <h3 className="fw-bold mb-0" style={{ fontSize: '2rem' }}>{totalProducts}</h3>
                    </div>
                    <span style={{ fontSize: '2.5rem' }}>📦</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm" style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(245, 87, 108, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-white-50 small mb-2">Total Stock</p>
                      <h3 className="fw-bold mb-0" style={{ fontSize: '2rem' }}>{totalStock}</h3>
                    </div>
                    <span style={{ fontSize: '2.5rem' }}>📊</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm" style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(79, 172, 254, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-white-50 small mb-2">Low Stock</p>
                      <h3 className="fw-bold mb-0" style={{ fontSize: '2rem' }}>{lowStockItems}</h3>
                    </div>
                    <span style={{ fontSize: '2.5rem' }}>⚠️</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm" style={{
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(250, 112, 154, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-white-50 small mb-2">Total Value</p>
                      <h3 className="fw-bold mb-0" style={{ fontSize: '2rem' }}>${totalValue.toFixed(0)}</h3>
                    </div>
                    <span style={{ fontSize: '2.5rem' }}>💰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button Section */}
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Products Inventory</h5>
            <button 
              onClick={handleAddClick}
              className="btn btn-primary fw-bold px-4 py-2"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ➕ Add New Product
            </button>
          </div>

          {/* Products Table */}
          <div>
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

export default Dashboard;