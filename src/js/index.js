import Notiflix from 'notiflix';
import InfiniteScroll from 'infinite-scroll';
import infiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';
import '../styles/main.css';
import createCardsMarkup from './createMarkup';
import fetchSearch from './fetchSearch';
import loadMorePages from './loadMorePages';
import smoothScroll from './smoothScroll';
const URL_KEY = '29676323-cbf3b0b0974f66dc50c141bea';
let page = 1;
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('.load-more'),
  pageLoadStatus: document.querySelector('.page-load-status'),
};
let infScroll = new InfiniteScroll(refs['gallery'], {
  path: () =>
    `https://pixabay.com/api/?key=${URL_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${(page += 1)}`,
  history: false,
  scrollThreshold: 100,
});
refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.pageLoadStatus.style.display = 'none';
  if (!e.target.elements.searchQuery.value.trim()) {
    return Notiflix.Notify.info('Type something!');
  }

  page = 1;
  const fetchResult = await fetchSearch(
    e.target.elements.searchQuery.value,
    page
  );
  const createdMarkup = await createCardsMarkup(fetchResult, refs.gallery);
  infScroll.on('scrollThreshold', infScrollOptions);
});

async function infScrollOptions() {
  try {
    page += 1;
    const fetch = await loadMorePages(
      refs.form.elements.searchQuery.value,
      page
    );
    if (!fetch.hits.length) throw new Error();
    const createdMarkup = await createCardsMarkup(fetch, refs.gallery);
    smoothScroll();
  } catch (error) {
    console.log('End');
    refs.pageLoadStatus.style.display = 'block';
    infScroll.off('scrollThreshold', infScrollOptions);
  }
}
// refs.loadMoreBtn.addEventListener('click', async e => {
//   page += 1;
//   const fetchResult = await onButtonMoreClick(
//     refs.form.elements.searchQuery.value,
//     page
//   );
// const createdMarkup = await createCardsMarkup(fetchResult, refs.gallery);
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
// })
