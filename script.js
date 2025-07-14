const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container');


const fetchRecipes = async (query) => {
    recipeContainer.innerHTML="<h2>Fetching Recipe....</h2>";
const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const response= await data.json();
//console.log(response.meals[0]);
recipeContainer.innerHTML="";
response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe'); // FIXED: should be `recipeDiv`, not `recipeContainer`
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span>Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span></p>
        `
        const button= document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        });
                recipeContainer.appendChild(recipeDiv);

    });
}
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    fetchRecipes(searchInput);
});
