import axios from 'axios';

export async function fetchImages(query, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42059071-0978dc0d7158b742eee7c30f5';
  const params = {
    per_page: 15,
    page: currentPage,
  };

  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  const res = await axios.get(url, { params });
  return res.data;
}
