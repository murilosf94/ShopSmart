const pool = require('../db');
exports.show = async (req, res, next) => {
    try {
      const [carrinho] = await pool.query(
        'SELECT * FROM carrinho WHERE id_usuario = ?',
        [req.params.id]
      );
      const [products] = await pool.query(
        'SELECT * FROM products ORDER BY createdAt DESC'
      );
      //if (rows.length === 0) return res.status(404).send('Produto não encontrado');
      res.render('carrinho', { carrinho, products });
    } catch (err) {
      next(err);
    }
  };
exports.add = async (req, res, next) => {
    const [carrinho] = await pool.query(
        'SELECT * FROM carrinho'
      );
    /*carrinho.forEach(async (c)=>{
        if (req.params.id == c.id_usuario && req.params.id2==c.id_products){
            c.quantidade=c.quantidade+1;
             await pool.execute(
                `UPDATE carrinho
                   SET quantidade=?
                 WHERE id = ?`,
                [c.quantidade , c.id ]
              );
              
              try {
                const [carrinho] = await pool.query(
                  'SELECT * FROM carrinho WHERE id_usuario = ?',
                  [req.params.id]
                );
                const [products] = await pool.query(
                  'SELECT * FROM products ORDER BY createdAt DESC'
                );
                //if (rows.length === 0) return res.status(404).send('Produto não encontrado');
                res.render('carrinho', { carrinho, products });
              } catch (err) {
                next(err);
              }
        }
        
        
    }
    );*/
    

    try {

        // 1) Pegue do body e atribua valores padrão caso venha undefined
        const id_usuario       = req.params.id;
        const id_products      = req.params.id2;
        // Converta para número ou 0
        const quantidade       =  1;
        
        // 2) Agora envie valores SEM undefined
        await pool.execute(
          `INSERT INTO carrinho
            (id_usuario, id_products, quantidade)
           VALUES (?, ?, ?)`,
          [id_usuario,id_products,quantidade]
        );
        
        
    
        
      } catch (err) {
        next(err);
      }
      try {
        const [carrinho] = await pool.query(
          'SELECT * FROM carrinho WHERE id_usuario = ?',
          [req.params.id]
        );
        const [products] = await pool.query(
          'SELECT * FROM products ORDER BY createdAt DESC'
        );
        //if (rows.length === 0) return res.status(404).send('Produto não encontrado');
        res.render('carrinho', { carrinho, products });
      } catch (err) {
        next(err);
      }
  };

  exports.add2 = async (req, res, next) => {
    const [carrinho] = await pool.query(
        'SELECT * FROM carrinho'
      );
    /*carrinho.forEach(async (c)=>{
        if (req.params.id == c.id_usuario && req.params.id2==c.id_products){
            c.quantidade=c.quantidade+req.body.quantity;
             await pool.execute(
                `UPDATE carrinho
                   SET quantidade=?
                 WHERE id = ?`,
                [c.quantidade , c.id ]
              );
              
              try {
                const [carrinho] = await pool.query(
                  'SELECT * FROM carrinho WHERE id_usuario = ?',
                  [req.params.id]
                );
                const [products] = await pool.query(
                  'SELECT * FROM products ORDER BY createdAt DESC'
                );
                //if (rows.length === 0) return res.status(404).send('Produto não encontrado');
                res.render('carrinho', { carrinho, products });
              } catch (err) {
                next(err);
              }
        }
        
        
    }
    );*/
    

    try {

        // 1) Pegue do body e atribua valores padrão caso venha undefined
        const id_usuario       = req.params.id;
        const id_products      = req.params.id2;
        // Converta para número ou 0
        const quantidade       =  req.body.quantity;
        
        // 2) Agora envie valores SEM undefined
        await pool.execute(
          `INSERT INTO carrinho
            (id_usuario, id_products, quantidade)
           VALUES (?, ?, ?)`,
          [id_usuario,id_products,quantidade]
        );
        
        
    
        
      } catch (err) {
        next(err);
      }
      try {
        const [carrinho] = await pool.query(
          'SELECT * FROM carrinho WHERE id_usuario = ?',
          [req.params.id]
        );
        const [products] = await pool.query(
          'SELECT * FROM products ORDER BY createdAt DESC'
        );
        //if (rows.length === 0) return res.status(404).send('Produto não encontrado');
        res.render('carrinho', { carrinho, products });
      } catch (err) {
        next(err);
      }
  };

  