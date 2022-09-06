const URL_KEY = '29676323-cbf3b0b0974f66dc50c141bea';
export default async function loadMorePages(value, page) {
  const response = await fetch(
    `https://pixabay.com/api/?key=${URL_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  const result = await response.json();
  return result;
}
