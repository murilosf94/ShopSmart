// controllers/productController.js
const pool = require('../db');

exports.index = async (req, res, next) => {
  try {
    const [products] = await pool.query(
      'SELECT * FROM products ORDER BY createdAt DESC'
    );
    res.render('products/index', { products });
  } catch (err) {
    next(err);
  }
};

exports.show = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).send('Produto não encontrado');
    res.render('products/show', { product: rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.new = (req, res) => {
  res.render('products/new');
};

// controllers/productController.js

exports.create = async (req, res, next) => {
  try {
    // 1) Pegue do body e atribua valores padrão caso venha undefined
    const name        = req.body.name        ?? '';
    const description = req.body.description ?? '';
    // Converta para número ou 0
    const price       = req.body.price       ? parseFloat(req.body.price) : 0;
    const stock       = req.body.stock       ? parseInt(req.body.stock, 10) : 0;
    // Se houver upload, use o filename; senão, null
    const imageUrl    = req.file ? '/uploads/' + req.file.filename : null;

    // 2) Agora envie valores SEM undefined
    await pool.execute(
      `INSERT INTO products
        (name, description, price, stock, imageUrl)
       VALUES (?, ?, ?, ?, ?)`,
      [name, description, price, stock, imageUrl]
    );

    res.redirect('/nossosprodutos');
  } catch (err) {
    next(err);
  }
};


exports.edit = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).send('Produto não encontrado');
    res.render('products/edit', { product: rows[0] });
  } catch (err) {
    next(err);
  }
};

// controllers/productController.js
exports.update = async (req, res, next) => {
  try {
    const { name, description, price, stock, currentImageUrl } = req.body;
    // se veio arquivo, use a nova imagem; senão, mantenha a antiga
    const imageUrl = req.file
      ? '/uploads/' + req.file.filename
      : currentImageUrl;

    await pool.execute(
      `UPDATE products
         SET name        = ?,
             description = ?,
             price       = ?,
             stock       = ?,
             imageUrl    = ?,
             updatedAt   = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [ name, description, price, stock, imageUrl, req.params.id ]
    );

    res.redirect('/nossosprodutos');
  } catch (err) {
    next(err);
  }
};




exports.destroy = async (req, res, next) => {
    console.log('>> destroy chamado para id =', req.params.id);

  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    res.redirect('/nossosprodutos');
  } catch (err) {
    console.error(err);
    next(err);
  }
};