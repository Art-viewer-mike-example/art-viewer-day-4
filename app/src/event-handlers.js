import { fetchAllArtByKeyword, fetchArtworkById } from "./fetch-funcs";
import { renderPaintings } from "./render-funcs";

export const handleSearchSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData.entries());

  const artworks = await fetchAllArtByKeyword(formDataObj);
  renderPaintings(document.querySelector('#paintings-container'), artworks);

  e.target.reset();
};

// TODO: after MVP launch, refactor this logic out to render functions
export const handleOpenPaintingModalFromArtworks = async (e) => {
  if (!e.target.matches('button')) return;
  const selectedPaintingModal = document.querySelector('#selected-painting-modal')
  const paintingPreloadInfo = document.querySelector('#painting-preload-info');
  paintingPreloadInfo.innerHTML = '';

  const { imageId, artworkId, title } = e.target.dataset;
  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  paintingPreloadInfo.append(titleEl);

  const img = document.createElement('img');
  img.src = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  img.alt = title;
  img.onload = () => {
    paintingPreloadInfo.append(img);
    selectedPaintingModal.showModal();
  };

  const paintingInfo = document.querySelector('#painting-info');
  paintingInfo.innerHTML = `
    <p>Artist: Loading...</p>
    <p>Date: Loading...</p>
    <p>Place of Origin: Loading...</p>
    <p>Medium: Loading...</p>
    <p>Classifications: Loading...</p>
    <p>Dimensions: Loading...</p>
  `;
  const [err, artworkInfo] = await fetchArtworkById(artworkId);
  if (err) return paintingInfo.innerHTML = 'Sorry, we could not find more information about this painting.';
  const { artist_title, classification_titles, date_display, place_of_origin, medium_display, dimensions } = artworkInfo;
  paintingInfo.innerHTML = `
    <p>Artist: ${artist_title}</p>
    <p>Date: ${date_display}</p>
    <p>Place of Origin: ${place_of_origin}</p>
    <p>Medium: ${medium_display}</p>
    <p>Classifications: ${(classification_titles || []).join(', ')}</p>
    <p>Dimensions: ${dimensions}</p>
  `;
  console.log('artworkInfo:', artworkInfo);
}

export const handleModalBackdropClickToClose = (e) => {
  const selectedPaintingModal = document.querySelector('#selected-painting-modal');
  if (!e.target.id === selectedPaintingModal.id) return;

  const modalBox = e.target.getBoundingClientRect();
  const mousePosition = { x: e.clientX, y: e.clientY };

  const clickedOutsideOfModal = (
    modalBox.top >= mousePosition.y ||
    mousePosition.y >= modalBox.top + modalBox.height ||
    modalBox.left >= mousePosition.x ||
    mousePosition.x >= modalBox.left + modalBox.width
  );

  if (clickedOutsideOfModal) selectedPaintingModal.close();
}