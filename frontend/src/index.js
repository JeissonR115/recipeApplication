async function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const recipeName = document.createElement('h3');
    recipeName.id = 'recipeName';
    recipeName.textContent = recipe.recipeName;
    recipeCard.appendChild(recipeName);

    const recipeDetails = document.createElement('div');
    recipeDetails.classList.add('recipe-details');

    const category = document.createElement('p');
    category.innerHTML = `<strong>Categoría:</strong> <span id="category">${recipe.category}</span>`;
    recipeDetails.appendChild(category);

    const description = document.createElement('p');
    description.innerHTML = `<strong>Descripción:</strong> <span id="description">${recipe.description}</span>`;
    recipeDetails.appendChild(description);

    const preparationSteps = document.createElement('p');
    preparationSteps.innerHTML = `<strong>Paso a paso:</strong> <span id="preparationSteps">${recipe.preparationSteps}</span>`;
    recipeDetails.appendChild(preparationSteps);

    const creator = document.createElement('p');
    creator.innerHTML = `<strong>Creador:</strong> <span id="creator">Usuario ID: ${recipe.userId}</span>`;
    recipeDetails.appendChild(creator);

    recipeCard.appendChild(recipeDetails);

    // Agregar imagen predeterminada si no existe
    const recipeImage = document.createElement('div');
    recipeImage.classList.add('recipe-image');

    const imgElement = document.createElement('img');
    imgElement.src = recipe.img || 'https://img.freepik.com/vector-gratis/diseno-platos-comida-color_23-2147563181.jpg';
    imgElement.alt = `Imagen de ${recipe.recipeName}`;
    recipeImage.appendChild(imgElement);

    recipeCard.appendChild(recipeImage);

    return recipeCard;
}

async function fetchAndDisplayRecipes(query) {
    const url = `http://localhost:3000/search?name=${query}`;

    try {
        const response = await fetch(url);
        const recipes = await response.json();

        const recipeInfoSection = document.getElementById('recipeInfo');
        recipeInfoSection.innerHTML = ''; // Limpiar resultados previos

        if (recipes.length === 0) {
            recipeInfoSection.innerHTML = '<p>No se encontraron recetas.</p>';
        } else {
            recipes.forEach(async (recipe) => {
                const recipeCard = await createRecipeCard(recipe);
                recipeInfoSection.appendChild(recipeCard);
            });
        }
    } catch (error) {
        console.error('Error al obtener las recetas:', error);
    }
}

// Añadir evento al botón de búsqueda
document.getElementById('searchButton').addEventListener('click', () => {
    const searchQuery = document.getElementById('search').value;
    if (searchQuery) {
        fetchAndDisplayRecipes(searchQuery); // Llamar a la función para obtener y mostrar recetas
    }
});

// También podrías permitir la búsqueda al presionar Enter en el campo de búsqueda
document.getElementById('search').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchQuery = event.target.value;
        if (searchQuery) {
            fetchAndDisplayRecipes(searchQuery);
        }
    }
});
