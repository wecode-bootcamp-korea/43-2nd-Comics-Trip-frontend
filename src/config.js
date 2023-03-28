export const BASE_URL = 'http://10.58.52.95:3001';
const BOOK_API = `${BASE_URL}/books`;

export const APIS = {
  login: `${BASE_URL}/user/kakao`,
  best: `${BOOK_API}/best`,
  genre: `${BOOK_API}/genre`,
  detail: `${BOOK_API}/detail`,
  owner: `${BOOK_API}/owner`,
  rental: `${BOOK_API}/rental`,
  recommend: `${BOOK_API}/recomlist`,
  review: `${BASE_URL}/reviews`,
  bookcase: `${BASE_URL}/librarys`,
  viewer: `${BASE_URL}/viewer`,
};
