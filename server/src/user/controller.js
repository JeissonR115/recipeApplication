import User from './model.js';
import { db } from '../../app.js';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.userExists(email)
        if (userExists) {
            return res.status(409).json({ message: "Este correo electrónico ya está registrado." });
        }

        const result = await User.register(username, email, password);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
}

// Inicio de sesión
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await User.login(email, password);
        res.json(result);
    } catch (error) {
        console.error("Error en el inicio de sesión:", error); // Log del error
        res.status(500).json({ message: error.message });
    }
};


// Obtener usuario por ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const result = await User.updateUser(id, username, email);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.deleteUser(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM Users");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
}