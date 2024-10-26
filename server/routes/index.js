import express from "express";
import BuscarReceta from "../src/busqueda.js";
import MostrarReceta from "../src/mostrar.js";
import userRoutes from "../src/user/routes.js";
import { getAllUsers } from "../src/user/controller.js";

const router = express.Router();

router.use("/search", BuscarReceta.searchRecipes);
router.use("/show/:recipeId", MostrarReceta.mostrarReceta);

router.use('/user', userRoutes);

router.use('/users', getAllUsers);

export default router;
