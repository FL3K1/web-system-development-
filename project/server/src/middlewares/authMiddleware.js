import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Buscamos el token en la cabecera (Header) de la petición
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: "Acceso denegado: Se requiere Token" });
  }

  try {
    // Verificamos si el token es real usando el secreto
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Guardamos los datos del usuario dentro de la petición
    next(); // Dejamos pasar al usuario
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};
// Nueva función: Solo deja pasar si el rol es 'admin'
export const verifyAdmin = (req, res, next) => {
  // verifyToken ya ha guardado los datos del usuario en req.user
  if (req.user && req.user.role === 'admin') {
    next(); 
  } else {
    res.status(403).json({ error: "Acceso denegado: Se requieren permisos de administrador" });
  }
};