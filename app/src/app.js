import { fetchAllArtByKeyword } from "./fetch-funcs";
import {
  handleSearchSubmit,
  handleOpenPaintingModalFromArtworks,
  handleModalBackdropClickToClose,
  handleAddToFavorites,
} from "./event-handlers";
import { mainSetup, renderPaintings } from "./render-funcs";

export default async function app(mainEl) {
  const { paintingsContainer, searchForm, selectedPaintingModal } = mainSetup(mainEl);

  const artworks = await fetchAllArtByKeyword();
  renderPaintings(paintingsContainer, artworks);

  searchForm.addEventListener('submit', handleSearchSubmit);
  paintingsContainer.addEventListener('click', handleOpenPaintingModalFromArtworks);
  paintingsContainer.addEventListener('click', handleAddToFavorites)
  selectedPaintingModal.addEventListener('click', handleModalBackdropClickToClose);
  selectedPaintingModal.addEventListener('click', handleAddToFavorites);
}
