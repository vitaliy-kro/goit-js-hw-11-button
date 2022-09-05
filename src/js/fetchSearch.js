import Notiflix from 'notiflix';
const URL_KEY = '29676323-cbf3b0b0974f66dc50c141bea';
export default async function fetchSearch(value, page) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${URL_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    const result = await response.json();
    if (!result.total) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notiflix.Notify.success(`Hooray, we found ${result.total} images`);
    console.log(result);
    return result;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}
