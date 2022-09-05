import Notiflix from 'notiflix';
const URL_KEY = '29676323-cbf3b0b0974f66dc50c141bea';
export default async function onButtonMoreClick(value, page) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${URL_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=2`
    );
    const result = await response.json();
    if (!result.hits.length)
      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    return result;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}
