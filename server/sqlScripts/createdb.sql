CREATE DATABASE RecipesDB;
USE RecipesDB;

-- Creación de la tabla Users
CREATE TABLE Users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla Recipes
CREATE TABLE Recipes (
    recipeId INT PRIMARY KEY AUTO_INCREMENT,
    recipeName VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    preparationSteps TEXT,
    userId INT,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

-- Creación de la tabla Ingredients
CREATE TABLE Ingredients (
    ingredientId INT PRIMARY KEY AUTO_INCREMENT,
    ingredientName VARCHAR(100) NOT NULL,
    unitOfMeasure VARCHAR(50),
    quantity DECIMAL(10, 2) -- Usar DECIMAL para mayor precisión
);

-- Creación de la tabla Recipe_Ingredients (relación muchos a muchos entre Recipes e Ingredients)
CREATE TABLE Recipe_Ingredients (
    recipeId INT,
    ingredientId INT,
    quantity DECIMAL(10, 2), -- Cantidad específica para cada receta
    PRIMARY KEY (recipeId, ingredientId),
    FOREIGN KEY (recipeId) REFERENCES Recipes(recipeId),
    FOREIGN KEY (ingredientId) REFERENCES Ingredients(ingredientId)
);

-- Creación de la tabla Checklists
CREATE TABLE Checklists (
    checklistId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    recipeId INT,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Añadir fecha de creación
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (recipeId) REFERENCES Recipes(recipeId)
);

-- Creación de la tabla SavedRecipes
CREATE TABLE SavedRecipes (
    savedRecipeId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    recipeId INT,
    saveDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (recipeId) REFERENCES Recipes(recipeId)
);

-- Creación de la tabla Checklist_Ingredients (para marcar ingredientes en el checklist)
CREATE TABLE Checklist_Ingredients (
    checklistId INT,
    ingredientId INT,
    isMarked BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (checklistId, ingredientId),
    FOREIGN KEY (checklistId) REFERENCES Checklists(checklistId),
    FOREIGN KEY (ingredientId) REFERENCES Ingredients(ingredientId)
);
