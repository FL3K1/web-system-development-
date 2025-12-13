import express from 'express';
import cors from 'cors';
import { query } from './db.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// HACER PÚBLICA LA CARPETA UPLOADS
// Esto permite acceder a las fotos desde el navegador
app.use('/uploads', express.static('uploads'));
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Ruta de prueba
app.get('/test-db', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({ message: 'Conexión exitosa', hora: result.rows[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al conectar a la BD' });
  }
});
app.get('/', (req, res) => {
  res.send('<h1>¡Servidor de la Tienda funcionando! </h1>');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});