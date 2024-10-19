import { db } from "../app.js";

class MostrarReceta {
    static mostrarReceta = async (req, res) => {
        const recipeId = req.params.recipeId; // Cambié 'receta_id' a 'recipeId'
        console.log(recipeId);

        // Validar que el ID de la receta es proporcionado
        if (!recipeId) {
            return res.status(400).json({ error: 'Recipe ID is required' });
        }

        try {
            // Consulta para obtener los detalles de la receta
            const recetaQuery = 'SELECT * FROM Recipes WHERE recipeId = ?'; // Cambié 'receta_id' a 'recipeId'
            const [receta] = await db.query(recetaQuery, [recipeId]);

            if (receta.length === 0) {
                return res.status(404).json({ error: 'Recipe not found' });
            }

            // Consulta para obtener los ingredientes de la receta
            const ingredientesQuery = `
                SELECT i.ingredientName, ri.quantity 
                FROM Ingredients i
                JOIN Recipe_Ingredients ri ON i.ingredientId = ri.ingredientId
                WHERE ri.recipeId = ?
            `;
            const [ingredients] = await db.query(ingredientesQuery, [recipeId]);
            console.log();
            // Devolver receta y sus ingredientes
            const recetaConIngredientes = {
                ...receta, // Detalles de la receta
                ingredientes: ingredients // Lista de ingredientes
            };

            res.status(200).json(recetaConIngredientes);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching the recipe' });
        }
    };
}

export default MostrarReceta;
