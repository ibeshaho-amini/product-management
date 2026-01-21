const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const productRoutes = require('./routes/product_route.js');
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
