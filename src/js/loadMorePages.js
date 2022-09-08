import { BASE_URL, URL_KEY } from './index';
export default async function loadMorePages(value, page) {
  const response = await fetch(
    `${BASE_URL}/api/?key=${URL_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  const result = await response.json();
  return result;
}
