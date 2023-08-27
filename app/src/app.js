import { fetchAllArtByKeyword } from "./fetch-funcs";
import {
  handleSearchSubmit,
  handleOpenPaintingModalFromArtworks,
  handleModalBackdropClickToClose,
} from "./event-handlers";
import { mainSetup, renderPaintings } from "./render-funcs";

export default async function app(mainEl) {
  const { paintingsContainer, searchForm, selectedPaintingModal } = mainSetup(mainEl);

  const artworks = await fetchAllArtByKeyword();
  renderPaintings(paintingsContainer, artworks);

  searchForm.addEventListener('submit', handleSearchSubmit);
  paintingsContainer.addEventListener('click', handleOpenPaintingModalFromArtworks);
  selectedPaintingModal.addEventListener('click', handleModalBackdropClickToClose);
}
