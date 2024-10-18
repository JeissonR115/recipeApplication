import express from "express";
import BuscarReceta from "../src/busqueda.js";


const router = express.Router();

router.use("/search",BuscarReceta.searchRecipes);


export default router;
