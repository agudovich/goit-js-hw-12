import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const galleryEl = document.querySelector('.gallery');

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li>
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <p><b>Likes:</b> <span>${likes}</span></p>
          <p><b>Views:</b> <span>${views}</span></p>
          <p><b>Comments:</b> <span>${comments}</span></p>
          <p><b>Downloads:</b> <span>${downloads}</span></p>
        </div>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  const loaderEl = document.querySelector('.loader');
  if (loaderEl) loaderEl.classList.add('visible');
}

export function hideLoader() {
  const loaderEl = document.querySelector('.loader');
  if (loaderEl) loaderEl.classList.remove('visible');
}
