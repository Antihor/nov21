function templateImg(hit) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = hit;
  return `<a href="${largeImageURL}" class="gallery-link"><li class="gallery-item">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
          </li></a>`;
}

export function createGallery(hits) {
  return hits.map(templateImg).join('');
}
