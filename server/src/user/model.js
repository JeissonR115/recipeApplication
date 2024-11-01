import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../../app.js";

const SECRET_KEY = 'testsecret';

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
    static async getUserById(id) {
        const query = 'SELECT userId, username, email, registrationDate FROM Users WHERE userId = ?';
        const results = await db.execute(query, [id]);
        console.log(results)
        if (results.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        return results[0];
    }


    static async updateUser(id, username, email) {
        const query = 'UPDATE Users SET username = ?, email = ? WHERE userId = ?';
        const result = await db.execute(query, [username, email, id]);

        if (result.affectedRows === 0) {
            throw new Error('Usuario no encontrado');
        }

        return { message: 'Usuario actualizado con éxito' };
    }

    static async deleteUser(id) {
        const query = 'DELETE FROM Users WHERE userId = ?';
        const result = await db.execute(query, [id]);

        console.log("este es el resultado", result)
        if (result.affectedRows === 0) {
            throw new Error('Usuario no encontrado');
        }

        return { message: 'Usuario eliminado con éxito', id: id };
    }

}

export default User;
