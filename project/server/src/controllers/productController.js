import { query } from '../../db.js';

//Ver todos los productos 
export const getAllProducts = async (req, res) => {
  try {
    // Esta consulta trae el producto y un array JSON con todas sus fotos extra
    const sql = `
      SELECT p.*, 
      COALESCE(json_agg(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL), '[]') as gallery
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;
    const result = await query(sql);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Crear Producto
export const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const userId = req.user.id;
  const files = req.files; 

  try {
    // Si no hay archivos, mainImage es null. Si hay, cogemos el primero.
    // El operador ?. por seguridad
    const mainImage = (files && files.length > 0) 
      ? `http://localhost:3000/uploads/${files[0].filename}` 
      : null;

    const newProduct = await query(
      'INSERT INTO products (name, description, price, stock, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [name, description, price, stock, mainImage, userId]
    );

    const productId = newProduct.rows[0].id;

    // Guardar álbum
    if (files && files.length > 0) {
      const imagePromises = files.map(file => {
        const url = `http://localhost:3000/uploads/${file.filename}`;
        return query('INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)', [productId, url]);
      });
      await Promise.all(imagePromises);
    }

    res.status(201).json({ message: "Producto creado", productId });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM products WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Actualizar producto (Reemplazando fotos antiguas)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const files = req.files; // Array de nuevos archivos

  try {
    // Actualizamos los datos de texto siempre
    const result = await query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
      [name, description, price, stock, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // SOLO si el usuario subió fotos nuevas, hacemos el reemplazo
    if (files && files.length > 0) {
      
      // Primero limpiamos la tabla de imágenes extra para este producto
      await query('DELETE FROM product_images WHERE product_id = $1', [id]);

      // Actualizamos la FOTO DE PORTADA (products.image_url)
      const newMainImage = `http://localhost:3000/uploads/${files[0].filename}`;
      await query('UPDATE products SET image_url = $1 WHERE id = $2', [newMainImage, id]);

      // Creamos el ÁLBUM NUEVO (product_images)
      const imagePromises = files.map(file => {
        const url = `http://localhost:3000/uploads/${file.filename}`;
        return query('INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)', [id, url]);
      });
      
      await Promise.all(imagePromises);
    }

    // Devolvemos el producto actualizado
    res.json({ message: "Producto e imágenes actualizadas", product: result.rows[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};