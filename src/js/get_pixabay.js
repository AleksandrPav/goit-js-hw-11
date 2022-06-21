import axios from 'axios'
import Notiflix from 'notiflix';



export default class ImgApiService {
  constructor() {
 
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.KEY = '28107487-df53024f81d649718d09de179';
    axios.defaults.baseURL = 'https://pixabay.com/api/';
  }
  async fetchImages(query, page, perPage) {
    const response = await axios.get(
      `?key=${this.KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    )
    this.incrementPage(); 
    return response.data.hits;
  
  }



  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }


  get query () {
    return this.searchQuery;
  }
  set query (newQuery) {
    this.searchQuery = newQuery;
  }

}