import { db } from "../app.js";

class MostrarReceta {

    static mostrarReceta = async (req, res) => {
        const { recetaId } = req.params; // Obtenemos el recipeId de los parámetros de la URL

        if (!recetaId) {
            return res.status(400).json({ error: 'Recipe ID is required' });
        }

        try {
            // Consulta para obtener los detalles de la receta
            const recetaQuery = 'SELECT * FROM Recipes WHERE recetaId = ?';
            const [receta] = await db.query(recetaQuery, [recetaId]);

            if (receta.length === 0) {
                return res.status(404).json({ error: 'Recipe not found' });
            }

            // Consulta para obtener los ingredientes de la receta
            const ingredientesQuery = `
                SELECT i.ingredientName 
                FROM Ingredients i
                JOIN Recipe_Ingredients ri ON i.ingredientId = ri.ingredientId
                WHERE ri.recipeId = ?
            `;
            const [ingredients] = await db.query(ingredientesQuery, [recetaId]);

            // Devolver receta y sus ingredientes
            const recetaConIngredientes = {
                ...receta[0], // Detalles de la receta
                ingredientes: ingredients.map(ing => ing.ingredientName) // Lista de ingredientes
            };

            res.status(200).json(recetaConIngredientes);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching the recipe' });
        }
    };
}

export default MostrarReceta;
