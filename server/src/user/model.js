import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../../app.js";

const SECRET_KEY = 'tu_clave_secreta';

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    static async userExists(email) {
        const existingUser = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
        return existingUser.length > 0;
    }
    static async register(username, email, password) {
        try {
            // Encripta la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Inserta el nuevo usuario
            const result = await db.query(
                "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
                [username, email, hashedPassword]
            );

            return { message: "Usuario registrado exitosamente", userId: String(result.insertId) };
        } catch (error) {
            throw new Error("Error al registrar usuario");
        }
    }
    static async login(email, password) {
        try {
            // Consultar usuario por correo electrónico
            const results = await db.query('SELECT * FROM Users WHERE email = ?', [email]);

            // Verificar si se encontró el usuario
            if (results.length === 0) {
                throw new Error('Usuario no encontrado');
            }

            const user = results[0];
            // Comparar contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Contraseña incorrecta');
            }

            // Generar token
            const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });
            return { message: 'Inicio de sesión exitoso', token };
        } catch (error) {
            throw error; // Lanzar el error para que el controlador lo maneje
        }
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

}

export default User;
