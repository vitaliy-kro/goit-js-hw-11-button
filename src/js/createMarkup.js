import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import card from '../template/card.handlebars';

export default async function createCardsMarkup(cards, element) {
  try {
    const createMarkup = await cards.hits
      .map(
        e => card(e)
        // `<div class="photo-card">
        //   <a href="${e.largeImageURL}" class="card-link"><img class="card-img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        //   <div class="info">
        //     <p class="info-item">
        //       <b>Likes <br>
        //       ${e.likes}</b>
        //     </p>
        //     <p class="info-item">
        //       <b>Views <br>
        //       ${e.views}</b>
        //     </p>
        //     <p class="info-item">
        //       <b>Comments <br>
        //       ${e.comments}</b>
        //     </p>
        //     <p class="info-item">
        //       <b>Downloads <br>
        //       ${e.downloads}</b>
        //     </p>
        //   </div>
        // </div></a>`
      )
      .join('');
    const addToDOM = await element.insertAdjacentHTML(
      'beforeend',
      createMarkup
    );
    const lightbox = new SimpleLightbox('.gallery__item');
    lightbox.refresh();
  } catch (error) {}
}
