import axios from 'axios';

const API_KEY = '51062655-c6be70d0f875c8df0d60bf3cc';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page,
    },
  });
  return response.data;
}
