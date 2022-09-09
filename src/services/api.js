export async function getCategories() {
  const urlCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const data = await fetch(urlCategories);
  const categories = await data.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlProducts = `https://api.mercadolibre.com/sites/MLB/search?q=${query}&category=${categoryId}`;
  const data = await fetch(urlProducts);
  const products = await data.json();
  return products;
}

export async function getProductsFromCategory(categoryId) {
  const urlProducts = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const data = await fetch(urlProducts);
  const products = await data.json();
  return products;
}

export async function getProductById(itemId) {
  const urlProducts = `https://api.mercadolibre.com/items/${itemId}`;
  const data = await fetch(urlProducts);
  const products = await data.json();
  return products;
}
