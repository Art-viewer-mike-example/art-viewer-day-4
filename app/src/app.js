import { fetchAllArtByKeyword } from "./fetch-funcs";
import {
  handleSearchSubmit,
  handleOpenPaintingModalFromArtworks,
  handleModalBackdropClickToClose,
  handleToggleFavorites,
} from "./event-handlers";
import { mainSetup, renderPaintings } from "./render-funcs";
import { getFavoriteArtworks } from "./store";

export default async function app(mainEl) {
  const { paintingsContainer, searchForm, selectedPaintingModal, favoritePaintingsContainer } = mainSetup(mainEl);
  const main = document.querySelector('main');

  renderPaintings(favoritePaintingsContainer, getFavoriteArtworks());

  searchForm.addEventListener('submit', handleSearchSubmit);
  selectedPaintingModal.addEventListener('click', handleModalBackdropClickToClose);

  main.addEventListener('click', handleToggleFavorites)
  main.addEventListener('click', handleOpenPaintingModalFromArtworks)

  const artworks = await fetchAllArtByKeyword();
  renderPaintings(paintingsContainer, artworks);
}
