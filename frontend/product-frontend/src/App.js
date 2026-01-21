// import React from 'react';
// import ProductPage from './pages/product_page';

// function App() {
//   return <ProductPage />;
// }

// export default App;


// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import ProductPage from './pages/product_page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;