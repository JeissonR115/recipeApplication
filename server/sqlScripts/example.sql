SELECT 
    r.recipeName,
    r.category,
    r.description,
    r.preparationSteps,
    u.username AS creator,
    GROUP_CONCAT(CONCAT(i.ingredientName, ' (', ri.quantity, ' ', i.unitOfMeasure, ')') SEPARATOR ', ') AS ingredients
FROM 
    Recipes r
JOIN 
    Users u ON r.userId = u.userId
JOIN 
    Recipe_Ingredients ri ON r.recipeId = ri.recipeId
JOIN 
    Ingredients i ON ri.ingredientId = i.ingredientId
WHERE 
    r.recipeId = 1 -- Cambia el número a la ID de la receta que deseas ver
GROUP BY 
    r.recipeId, u.userId;