import { db } from "../app.js";

class BuscarReceta {

    static searchRecipes = async (req, res) => {
        const { name, ingredients, category } = req.query;
    
        let query = 'SELECT * FROM Recipes WHERE 1=1'; // Base de la consulta
        const params = [];
    
        if (name) {
            query += ' AND recipeName LIKE ?';
            params.push(`%${name}%`); // Corregido el uso de la sintaxis para comodines SQL
        }
    
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
    
        if (ingredients) {
            const ingredientList = ingredients.split(','); // Separar ingredientes por coma
            query += ' AND recipeId IN (SELECT recipeId FROM Recipe_Ingredients WHERE ingredientId IN (SELECT ingredientId FROM Ingredients WHERE ingredientName IN (?)))';
            params.push(ingredientList);
        }
    
        try {
            const [results] = await db.query(query, params); // Usar this.db para acceder a la conexión
            res.status(200).json(results); // Devuelve las recetas encontradas
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error searching recipes' });
        }
    };
}

export default BuscarReceta;