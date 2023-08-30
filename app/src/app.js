import { fetchAllArtByKeyword } from "./fetch-funcs";
import {
  handleSearchSubmit,
  handleOpenPaintingModalFromArtworks,
  handleModalBackdropClickToClose,
  handleAddToFavorites,
} from "./event-handlers";
import { mainSetup, renderPaintings } from "./render-funcs";
import { getSavedArtworks } from "./store";

export default async function app(mainEl) {
  const { paintingsContainer, searchForm, selectedPaintingModal, favoritePaintingsContainer } = mainSetup(mainEl);

  const artworks = await fetchAllArtByKeyword();
  renderPaintings(paintingsContainer, artworks);
  renderPaintings(favoritePaintingsContainer, getSavedArtworks());

  searchForm.addEventListener('submit', handleSearchSubmit);
  paintingsContainer.addEventListener('click', handleOpenPaintingModalFromArtworks);
  paintingsContainer.addEventListener('click', handleAddToFavorites)
  selectedPaintingModal.addEventListener('click', handleModalBackdropClickToClose);
  selectedPaintingModal.addEventListener('click', handleAddToFavorites);
}
