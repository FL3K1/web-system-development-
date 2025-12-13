import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bookRouter from './src/routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración para __dirname en módulos ES6 (necesario para la carpeta public)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Middleware para entender JSON [cite: 938]
app.use(express.json());

// 2. Servir archivos estáticos (el index.html de bienvenida)
app.use(express.static(path.join(__dirname, 'public')));

// 3. Rutas de la API
app.use('/books', bookRouter);

// 4. Middleware para endpoints desconocidos (Opcional pero recomendado en PDF [cite: 1121])
app.use((req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});