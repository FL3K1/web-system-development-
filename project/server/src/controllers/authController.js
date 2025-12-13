import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../../db.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Validar datos
    if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

    // 2. Comprobar si ya existe
    const userCheck = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) return res.status(409).json({ error: "Usuario ya existe" });

    // 3. Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Guardar en BD
    const newUser = await query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, role',
      [username, email, passwordHash]
    );

    res.status(201).json({ message: "Usuario registrado", user: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Login correcto", token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};