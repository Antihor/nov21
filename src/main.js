import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay';
import { createGallery } from './js/render';

const formRef = document.querySelector('.form');
const buttRef = document.querySelector('.btn');
const galRef = document.querySelector('.gallery');
const moreRef = document.querySelector('.load');
const loaderRef = document.querySelector('.loader');

let query;
let page;
let lastPage;

formRef.addEventListener('submit', onSubmit);

async function onSubmit(ev) {
  ev.preventDefault();

  query = ev.target.elements.query.value.trim();
  page = 1;
  loaderOn;
  if (!query) {
    showError('Emty field');
    ev.target.reset();
    return;
  }

  try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0) {
      showError('Sorry, no matches found. Please, try another query');
      ev.target.reset();
      return;
    }
    lastPage = Math.ceil(data.total / 15);

    galRef.innerHTML = '';

    renderImages(data.hits);
  } catch (err) {
    showError(err);
    lastPage = 0;
    galRef.innerHTML = '';
  }
  loaderOff();
  checkMore();

  ev.target.reset();
  showMore();
}

moreRef.addEventListener('click', onMore);

async function onMore() {
  page += 1;
  loaderOn();
  const data = await fetchImages(query, page);
  renderImages(data.hits);
  loaderOff();
  checkMore();
}

function renderImages(hits) {
  const markup = createGallery(hits);
  galRef.insertAdjacentHTML('beforeend', markup);
}
function showMore() {
  moreRef.classList.remove('hidden');
}

function hideMore() {
  moreRef.classList.add('hidden');
}

function checkMore() {
  if (page >= lastPage) {
    hideMore();
  } else {
    showMore();
  }
}
function loaderOn() {
  loaderRef.classList.remove('hidden');
}

function loaderOff() {
  loaderRef.classList.add('hidden');
}
function showError(msg) {
  iziToast.error({
    title: 'Error!',
    message: msg,
    position: 'center',
  });
}
