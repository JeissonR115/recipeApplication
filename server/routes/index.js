import express from "express";
import BuscarReceta from "../src/busqueda.js";
import MostrarReceta from "../src/mostrar.js";


const router = express.Router();

router.use("/search", BuscarReceta.searchRecipes);
router.use("/show/:recipeId", MostrarReceta.mostrarReceta);



export default router;
