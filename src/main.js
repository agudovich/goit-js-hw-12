import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = formEl.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  const query = inputEl.value.trim();

  if (!query) {
    iziToast.info({ message: 'Please enter a search term' });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  currentQuery = query;
  currentPage = 1;

  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchImages(true);
});

async function fetchImages(isLoadMore = false) {
  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0 && !isLoadMore) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        iconUrl: '/goit-js-hw-10/img/bi_x-octagon.svg',
        progressBarColor: '#b51b1b',
        color: '#ef4040',
        transitionIn: 'fadeInDown',
        maxWidth: '432px',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        iconUrl: '/goit-js-hw-10/img/bi_x-octagon.svg',
        progressBarColor: '#b51b1b',
        color: '#ef4040',
        transitionIn: 'fadeInDown',
        maxWidth: '432px',
      });
    }

    if (isLoadMore) {
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong, try again later' });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery li')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
