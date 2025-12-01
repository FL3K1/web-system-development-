import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bookRouter from './src/routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración 
const file = fileURLToPath(import.meta.url);
const dir = path.dirname(file);

//Middleware para entender JSON 
app.use(express.json());

// index.html de bienvenida
app.use(express.static(path.join(dir, 'public')));

//Rutas de la API
app.use('/books', bookRouter);

//captura errores 
app.use((req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
});

//Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});