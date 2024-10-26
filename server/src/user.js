import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../app.js";

const SECRET_KEY = 'tu_clave_secreta';

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Método para registrar un nuevo usuario
    async register() {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            const query = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';

            return new Promise((resolve, reject) => {
                db.query(query, [this.username, this.email, hashedPassword], (err, result) => {
                    if (err) reject(err);
                    resolve({ message: 'Usuario registrado con éxito', userId: result.insertId });
                });
            });
        } catch (error) {
            throw new Error('Error en el registro del usuario');
        }
    }

    // Método estático para el inicio de sesión
    static async login(email, password) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
                if (err) reject(err);

                if (results.length === 0) reject({ message: 'Usuario no encontrado' });

                const user = results[0];
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) reject({ message: 'Contraseña incorrecta' });

                const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });
                resolve({ message: 'Inicio de sesión exitoso', token });
            });
        });
    }

    // Método estático para obtener un usuario por ID
    static getUserById(id) {
        const query = 'SELECT userId, username, email, registrationDate FROM Users WHERE userId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                if (results.length === 0) reject({ message: 'Usuario no encontrado' });
                resolve(results[0]);
            });
        });
    }

    // Método estático para actualizar un usuario
    static updateUser(id, username, email) {
        const query = 'UPDATE Users SET username = ?, email = ? WHERE userId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [username, email, id], (err, result) => {
                if (err) reject(err);
                if (result.affectedRows === 0) reject({ message: 'Usuario no encontrado' });
                resolve({ message: 'Usuario actualizado con éxito' });
            });
        });
    }

    // Método estático para eliminar un usuario
    static deleteUser(id) {
        const query = 'DELETE FROM Users WHERE userId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, result) => {
                if (err) reject(err);
                if (result.affectedRows === 0) reject({ message: 'Usuario no encontrado' });
                resolve({ message: 'Usuario eliminado con éxito' });
            });
        });
    }

    static async getAllUsers(req, res) {
        try {
            const [rows] = await db.query("SELECT userId, username, email, registrationDate FROM Users");
            res.status(200).json(rows);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            res.status(500).json({ message: "Error al obtener los usuarios" });
        }
    }
}

export default User;
