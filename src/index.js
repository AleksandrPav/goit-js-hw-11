import ImgApiService from "./js/get_pixabay.js";
import Notiflix from 'notiflix';


const refs = {
    searchForm: document.querySelector('#search-form'),
    searchInput: document.querySelector('input'),
    searchBtn: document.querySelector('.search'),
    loadBtn: document.querySelector('.load-more'),
    gallaryList: document.querySelector('.gallery')

}
console.log(refs);

const imgApiService = new ImgApiService();
// console.log(fetchImages('cat'));


refs.searchForm.addEventListener('submit', onSearchSubmit)
refs.loadBtn.addEventListener('click', onLoadMore)



function onSearchSubmit(e) {
    e.preventDefault();
    imgApiService.query = refs.searchInput.value;
    imgApiService.resetPage();
    imgApiService.fetchImages(imgApiService.query, imgApiService.page, imgApiService.perPage).then(appendImgMarkup);

    
}


function onLoadMore() {
    imgApiService.fetchImages(imgApiService.query, imgApiService.page, imgApiService.perPage).then(appendImgMarkup);   
}

function appendImgMarkup(images) {
    
    const markup = images.map(({ webformatURL, tags, likes, comments, views, downloads }) => {
        return `
   <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
    `;
    }).join('');
    return refs.gallaryList.insertAdjacentHTML('beforeend', markup);

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






