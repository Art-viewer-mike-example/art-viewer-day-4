const getStoreData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err)
    return null;
  }
};

const favoriteArtworks = (artworks) => {
  localStorage.setItem('artworks', JSON.stringify(artworks));
};

// const artwork = {
//   id: 23119,
//   image_id: '1e452e34-3a2b-0dca-35c3-c7236c612985',
//   title: 'Village Among the Trees',
// };

export const getFavoriteArtworks = () => {
  const artworks = getStoreData('artworks')
  return (artworks) ? artworks : [];
};

export const addFavoriteArtwork = (artwork) => {
  favoriteArtworks([...getFavoriteArtworks(), artwork]);
}

export const clearFavoriteArtworks = () => {
  localStorage.setItem('artworks', '[]');
};

export const removeFavoriteArtwork = (givenId) => {
  const filteredArt = getFavoriteArtworks().filter(({ id })=> Number(id) !== Number(givenId));
  favoriteArtworks(filteredArt);
}

export const isFavoriteArtwork = (id) => {
  return !!getFavoriteArtworks().find(({ id: favId }) => Number(favId) === Number(id));
}