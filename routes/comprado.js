var express = require('express');
const router = express.Router();
const carrinhoCtrl = require('../controllers/carrinhoController');
const productCtrl = require('../controllers/productController');
const pool = require('../db');

const multer = require('multer');
const path = require('path');

router.get('/comprado', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products'); // Adjust table name if needed
    res.render('comprado', { 
      carrinho: req.session.carrinho || [],
      products: rows
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;