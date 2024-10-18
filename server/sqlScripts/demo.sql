-- Inserción de un nuevo usuario
INSERT INTO Users (username, email, password) VALUES 
('chefJuan', 'juan@example.com', 'password123');

-- Inserción de recetas
INSERT INTO Recipes (recipeName, category, description, preparationSteps, userId) VALUES 
('Tacos al Pastor', 'Mexicana', 'Deliciosos tacos con carne de cerdo marinada.', '1. Marinar la carne. 2. Cocinar la carne. 3. Servir en tortillas con piña.', 1),
('Spaghetti Carbonara', 'Italiana', 'Pasta con una rica salsa de huevo y queso.', '1. Cocinar la pasta. 2. Mezclar huevo y queso. 3. Combinar todo y servir.', 1),
('Sushi Roll', 'Japonesa', 'Rollos de sushi rellenos de pescado y vegetales.', '1. Cocinar el arroz. 2. Preparar los ingredientes. 3. Enrollar y cortar.', 1),
('Ensalada César', 'Ensaladas', 'Ensalada fresca con pollo, lechuga y aderezo César.', '1. Cocinar el pollo. 2. Mezclar los ingredientes. 3. Servir con aderezo.', 1),
('Brownies', 'Postres', 'Dulces brownies de chocolate.', '1. Mezclar los ingredientes. 2. Hornear. 3. Cortar y servir.', 1);

-- Inserción de ingredientes
INSERT INTO Ingredients (ingredientName, unitOfMeasure, quantity) VALUES 
('Carne de cerdo', 'kg', 1.5),
('Tortillas', 'unidades', 10),
('Piña', 'g', 200),
('Espaguetis', 'g', 500),
('Huevo', 'unidades', 4),
('Queso parmesano', 'g', 150),
('Arroz para sushi', 'g', 300),
('Salmón', 'g', 200),
('Lechuga', 'g', 100),
('Pollo', 'kg', 0.5),
('Mantequilla', 'g', 100),
('Chocolate', 'g', 200);

-- Inserción de las relaciones entre recetas e ingredientes
INSERT INTO Recipe_Ingredients (recipeId, ingredientId, quantity) VALUES 
(1, 1, 1.5), -- Tacos al Pastor
(1, 2, 10),  -- Tacos al Pastor
(1, 3, 200), -- Tacos al Pastor
(2, 4, 500), -- Spaghetti Carbonara
(2, 5, 4),   -- Spaghetti Carbonara
(2, 6, 150), -- Spaghetti Carbonara
(3, 7, 300), -- Sushi Roll
(3, 8, 200), -- Sushi Roll
(4, 9, 100), -- Ensalada César
(4, 10, 0.5), -- Ensalada César
(5, 11, 200); -- Brownies
