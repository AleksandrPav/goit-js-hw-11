import { fetchImages } from "./js/get_pixabay.js";
import Notiflix from 'notiflix';


const refs = {
    searchForm: document.querySelector('#search-form'),
    searchInput: document.querySelector('input'),
    searchBtn: document.querySelector('button'),
    gallaryList: document.querySelector('.gallery')
}
console.log(refs);
console.log(fetchImages('cat', 1, 10));


function emptyArray() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

refs.searchForm.addEventListener('click', toGetPixabay);

function toGetPixabay(e) {
    e.preventDefault();
    const name = refs.searchInput.value;
    if (name === '') {
       return emptyArray();
    }
}

fetchImages(query).then(data => {
    refs.gallaryList.innerHTML = "";
    if (data.length === 1) {
        refs.gallaryList.insertAdjacentHTML(`beforeend`, renderGallery(data));
    }
}
).catch(error => { console.log(error); }
);


function renderGallery(images) {
    const markup = dataImg.map(({largeImageURL,tags,likes,view,comments,downloads }) => {
        return `
<div class="photo-card">
        <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
         <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
        <b>Views: ${view}</b>
        </p>
        <p class="info-item">
         <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
         <b>Downloads: ${downloads}</b>
        </p>
  </div>
</div>
        `

    }).join('');
    return markup;
    
}




// refs.searchForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const query = refs.searchInput.value;
//     if (query === '') {
//         emptyArray();
//     } else {
//         getPixabay(query)
//             .then(data => {
//                 if (data.total === 0) {
//                     emptyArray();
//                 } else {
//                     renderGallery(data.hits);
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             }
//         );
//     }
// }
// );

