import { db } from "../app.js";

class BuscarReceta {
    static searchRecipes = async (req, res) => {
        const { name, ingredients, category } = req.query;
        
        let query = 'SELECT * FROM Recipes WHERE 1=1'; // Base de la consulta
        const params = []; // Array para almacenar los valores de los parámetros

        // Filtrar por nombre
        if (name) {
            query += ' AND recipeName LIKE ?';
            params.push(`%${name}%`); // Agregar nombre con comodín SQL
        }

        // Filtrar por categoría
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        // Filtrar por ingredientes
        if (ingredients) {
            const ingredientList = ingredients.split(','); // Dividir los ingredientes por comas
            if (ingredientList.length > 0) {
                query += ` AND recipeId IN (
                    SELECT recipeId 
                    FROM Recipe_Ingredients 
                    WHERE ingredientId IN (
                        SELECT ingredientId 
                        FROM Ingredients 
                        WHERE ingredientName IN (${ingredientList.map(() => '?').join(',')})
                    )
                )`;
                params.push(...ingredientList); // Agregar los ingredientes al array de parámetros
            }
        }

        console.log("Consulta generada:", query);
        console.log("Parámetros:", params);

        try {
            // Verificar si no se pasan parámetros (devolver todas las recetas)
            if (Object.keys(req.query).length === 0) {
                const [results] = await db.query('SELECT * FROM Recipes');
                return res.status(200).json(results); // Devolver todas las recetas
            }

            // Ejecutar la consulta con los filtros
            const [results] = await db.query(query, params);

            // Asegurar que siempre se devuelva un array
            if (!Array.isArray(results)) {
                return res.status(200).json([results]); // Envolver el objeto en un array
            }

            // Manejar el caso de que no se encuentren recetas
            if (results.length === 0) {
                return res.status(404).json({ message: "No se encontraron recetas" });
            }

            // Devolver los resultados como array
            res.status(200).json(results);
        } catch (err) {
            console.error("Error al buscar recetas:", err);
            res.status(500).json({ error: 'Error searching recipes' });
        }
    };
}

export default BuscarReceta;
