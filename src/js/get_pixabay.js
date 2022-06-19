import axios from 'axios'
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/'
const KEY = '28107487-df53024f81d649718d09de179'

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  )
  return response
}
