import ImgApiService from "./js/get_pixabay.js";
import LoadMoreBtn from "./js/load_more_btn.js";
import Notiflix from 'notiflix';


const refs = {
    searchForm: document.querySelector('#search-form'),
    searchInput: document.querySelector('input'),
    searchBtn: document.querySelector('.search'),
    // 
    gallaryList: document.querySelector('.gallery')

}
console.log(refs);

const LoadMoreButton = new LoadMoreBtn({selector: '[class="load-more"]', hidden: true});
const imgApiService = new ImgApiService();
// console.log(fetchImages('cat'));

console.log(LoadMoreButton);



refs.searchForm.addEventListener('submit', onSearchSubmit)
LoadMoreButton.refs.loadBtn.addEventListener('click', onLoadMore);

const data = imgApiService.fetchImages();
console.log(data.then(data.totalHits));



function onSearchSubmit(e) {
  e.preventDefault();
  
  LoadMoreButton.show();
  imgApiService.resetPage();
  clearContainer();
  imgApiService.query = refs.searchInput.value.trim();

  getFetchImages();
  
 
  
  
}

function onLoadMore() {
  getFetchImages();
  
}

function getFetchImages() {
  LoadMoreButton.disable();
  imgApiService.fetchImages(imgApiService.query, imgApiService.page, imgApiService.perPage)
    .then(images => {
      if (images.length) {
        appendImgMarkup(images);
        LoadMoreButton.enable();
      }
      else {
        noMoreImg()
      
      }

      
    })
  
}


function appendImgMarkup(images) {
    
    const markup = images.map(({ webformatURL, tags, likes, comments, views, downloads }) => {
        return `
   <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:</b>
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      <b>${downloads}</b>
    </p>
  </div>
</div>
    `;
    }).join('');
    return refs.gallaryList.insertAdjacentHTML('beforeend', markup);

}



function clearContainer() {
  refs.gallaryList.innerHTML = '';
}

function noMoreImg() {
  Notiflix.Notify.failure('Were sorry, but youve reached the end of search results.');
  LoadMoreButton.hide();
}

function succssess(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}






//     const markup = `
//     <div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views:${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads;${downloads}</b>
//     </p>
//   </div>
// </div>
// `
//     refs.gallaryList.insertAdjacentHTML('beforeend', markup);
// }






