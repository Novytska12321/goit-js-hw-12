import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createGalleryCard } from "./js/render-functions.js";
import { fetchPhotos } from "./js/pixabay-api.js";

const button = document.querySelector(".main-button");
const searchFormEl = document.querySelector(".main-form");
const inputEl = document.querySelector(".main-input");
const galleryEl = document.querySelector(".js-list");
const loadMoreBtnEl = document.querySelector(".js-load-more");
const loaderEl = document.querySelector(".loader");
const lightbox = new SimpleLightbox('.gallery-card a', {
    captionsData: 'alt',
    captionDelay: 250,
});
let currentPage = 1;
let searchValue = "";
let cardHeight = 0;

const onSearchFormSubmit = async event => {
    event.preventDefault();
    galleryEl.innerHTML = '';
    searchValue = inputEl.value.trim();
    currentPage = 1;

    if (searchValue === "") {
        return iziToast.show({
            message: 'Please fill out the form!',
            position: "topRight",
            color: 'red'
        });
    }

    loaderEl.classList.remove('is-hidden');

    try {
        const data = await fetchPhotos(searchValue, currentPage);

        if (data.hits.length === 0) {
            return iziToast.show({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
                color: 'red',
            });
        }

        const galleryMarkup = data.hits.map(createGalleryCard).join('');
        galleryEl.innerHTML = galleryMarkup;
        const galleryCardEl = galleryEl.querySelector("li");
        
        cardHeight = galleryCardEl.getBoundingClientRect().height;
        lightbox.refresh();
        loadMoreBtnEl.classList.remove("is-hidden")

    } catch (error) {
        console.log(error);

    } finally {
        loaderEl.classList.add('is-hidden'); 
        searchFormEl.reset(); 
    }
};
const onLoadMoreBtnClick = async event => {
   try {
       currentPage++;
       const data = await fetchPhotos(searchValue, currentPage);
       const galleryMarkup = data.hits.map(createGalleryCard).join('');
       galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
       scrollBy({
           top: cardHeight * 2,
           behavior: 'smooth',
       })
       if (currentPage === response.data.totalHits) {
           loadMoreBtnEl.classList.add("is-hidden");
           return iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
                color: 'blue',
               
           })
       }
       
   } catch (error) {
    console.log(error);
    
   }
    
}
searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
