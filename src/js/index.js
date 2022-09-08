import Notiflix from 'notiflix';
import '../styles/main.css';
import createCardsMarkup from './createMarkup';
import fetchSearch from './fetchSearch';
import loadMorePages from './loadMorePages';
import smoothScroll from './smoothScroll';
const URL_KEY = '29676323-cbf3b0b0974f66dc50c141bea';
const BASE_URL = 'https://pixabay.com/';
export { URL_KEY, BASE_URL };
const failureSearchMessage =
  'Sorry, there are no images matching your search query. Please try again.';
let page = 1;
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
refs.form.addEventListener('submit', async e => {
  try {
    e.preventDefault();
    clearGallery();
    const trimmedValue = e.target.elements.searchQuery.value.trim();
    if (!trimmedValue) return Notiflix.Notify.warning('Type something!');

    page = 1;
    const fetchResult = await fetchSearch(trimmedValue, page);
    Notiflix.Notify.success(`Hooray, we found ${fetchResult.total} images`);
    const createdMarkup = await createCardsMarkup(fetchResult, refs.gallery);

    if (fetchResult.total > 40) refs.loadMoreBtn.style.display = 'block';
  } catch (error) {
    defaultButtonStatus();
    Notiflix.Notify.failure(failureSearchMessage);
  }
});

refs.loadMoreBtn.addEventListener('click', async e => {
  try {
    const trimmedValue = refs.form.elements.searchQuery.value.trim();
    const fetchResult = await loadMorePages(trimmedValue, (page += 1));
    if (!fetchResult.hits.length) throw new Error();

    const createdMarkup = await createCardsMarkup(fetchResult, refs.gallery);
    smoothScroll();
  } catch (error) {
    defaultButtonStatus();
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
});

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function defaultButtonStatus() {
  refs.loadMoreBtn.style.display = 'none';
}
