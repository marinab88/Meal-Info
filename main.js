const button = document.getElementById('getMeal');
const mealDisplay = document.getElementById('displayMeal');

button.addEventListener('click', () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  //fetch API to do the request
  fetch(url)
    .then(response => response.json())
    .then(response => {
    createMeal(response.meals[0]);
  })
  .catch(error => {
    console.warn(error);
  });
});

const createMeal = (meal) => {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for(let i=1; i<=20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  
  const newInnerHTML = `
    <div class="row">
      <div class="col-5">
        <img src="${meal.strMealThumb}" alt="Meal Image">
        ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
        ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        <h5>Ingredients:</h5>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>
      <div class="col-7
      ">
        <h4>${meal.strMeal}</h4>
        <p>${meal.strInstructions}</p>
      </div>
    </div>
    `;
  
  mealDisplay.innerHTML = newInnerHTML;
  
}
