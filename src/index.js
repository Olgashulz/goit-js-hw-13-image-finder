import './sass/main.scss';
import galleryTpl from './templates/galleryTpl.hbs';
import gallery from './js/apiService';
import openModal from './js/modal';


import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import {error} from '@pnotify/core';

const debounce = require('lodash.debounce');

const galleryImage = new gallery();


const refs = {
    inputEl: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.button-load-more'),

}


refs.btnLoadMore.addEventListener('click', addPictures);
refs.gallery.addEventListener('click', openModal);
refs.inputEl.addEventListener('input', debounce(takeInputValue, 1500))

function takeInputValue(event){
    let value = event.target.value.toLowerCase().trim();
    console.log(value);

    if(value === ''){
        hideButton()
        clearContainer();       
        return InputError();
    }

    if (value !== galleryImage.inputValue){
        //console.log(value.length < galleryImage.inputValue);
        clearContainer();
        galleryImage.returnStartPage();
        galleryImage.setInputValue(value);
    }

        return showPictures(galleryImage.inputValue)
}

function showPictures () {
    galleryImage.getPictures()
    .then(hits => 
    {renderGallery(hits)})    
    .then(galleryImage.incrementPage())
    .then(showButton());
}
    
function renderGallery(arr) {   

    if (arr.hits.length < 1) {
        notifError();
    }
    // console.log(arr)
    const markup = galleryTpl(arr);
    //console.log(markup);   
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}


function addPictures(event){
    event.preventDefault();
    galleryImage.getPictures()
    .then(hits => 
        {renderGallery(hits)})
    .then(galleryImage.incrementPage())
    
}

function clearContainer(){
    refs.gallery.innerHTML = '';
}

function showButton(){
    refs.btnLoadMore.classList.add('visible');
}

function hideButton(){
    refs.btnLoadMore.classList.remove('visible');
}


function notifError() {
    error({
        title: 'Unfortunately, your search returned no results.',
        text: 'Try again :)',
        delay: 1500
      });
};

function InputError() {
    error({
        title: 'Incorrected input',
        text: 'Please, try again :)',
        delay: 1500
      });
};

