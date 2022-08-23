export const fetchContent = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchRecipes = async (type) => {
  if (type === 'Food') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  }
  if (type === 'Drink') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  }
};
