import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; // Extrae el token después de 'Bearer'
    console.log(SECRET_KEY)
    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }
    console.log('Token recibido:', token); // Para depuración

    jwt.verify(token, SECRET_KEY, (err, decoded) => {

        if (err) {
            console.error('Error al verificar el token:', err); // Para depuración
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        req.userId = decoded.userId; // Guarda el userId en req para usarlo en las rutas protegidas
        next();
    });
};
