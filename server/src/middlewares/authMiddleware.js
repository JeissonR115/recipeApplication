import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // El token debe ser enviado en el encabezado "Authorization: Bearer <token>"

    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido o expirado' });
        req.userId = decoded.userId; // Guarda el userId en req para usarlo en las rutas protegidas
        next();
    });
};
