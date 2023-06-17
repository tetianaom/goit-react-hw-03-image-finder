import axios from 'axios';

const API_KEY = '35939977-4cb2344a1a4537c5389641f6d';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page, signal) => {
  const response = await axios.get('', {
    signal,
    params: {
      q: query,
      page,
    },
  });

  return response.data;
};
