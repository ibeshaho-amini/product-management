
const { Product } = require('../models');

exports.createProduct = async (req, res) => {
  try {
    console.log('Body received:', req.body); // Debug log
    
    const { name, description, price, stock, image } = req.body;

    // Validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!price || price <= 0) {
      return res.status(400).json({ error: 'Valid price is required' });
    }
    if (stock === undefined || stock < 0) {
      return res.status(400).json({ error: 'Valid stock is required' });
    }

    const product = await Product.create({
      name: name.trim(),
      description: description || null,
      price: parseFloat(price),
      stock: parseInt(stock),
      image: image || null
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ error: err.message || 'Failed to create product' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']]
    });
    return res.status(200).json(products);
  } catch (error) {
    console.error('Get All Products Error:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Get Product Error:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    console.log('Update Body received:', req.body); // Debug log
    
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, description, price, stock, image } = req.body;

    if (name && name.trim() === '') {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }
    if (price && price <= 0) {
      return res.status(400).json({ error: 'Price must be greater than 0' });
    }
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ error: 'Stock cannot be negative' });
    }

    await product.update({
      name: name || product.name,
      description: description !== undefined ? description : product.description,
      price: price ? parseFloat(price) : product.price,
      stock: stock !== undefined ? parseInt(stock) : product.stock,
      image: image || product.image
    });

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Update Product Error:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    return res.status(200).json({ 
      success: true,
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Delete Product Error:', error);
    return res.status(500).json({ error: error.message });
  }
};