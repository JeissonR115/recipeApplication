import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../app.js";
import dotenv from "dotenv";
const SECRET_KEY = process.env.SECRET_KEY || 'tu_clave_secreta';

// Función para el inicio de sesión
export const login = (req, res) => {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Consulta para encontrar al usuario por email
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error en la consulta', error: err });

        // Validar si el usuario existe
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const user = results[0];

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Crear el token JWT
        const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    });
};
