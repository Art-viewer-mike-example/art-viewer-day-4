const getStoreData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err)
    return null;
  }
};

const saveArtworks = (artworks) => {
  localStorage.setItem('artworks', JSON.stringify(artworks));
};

// const artwork = {
//   id: 23119,
//   image_id: '1e452e34-3a2b-0dca-35c3-c7236c612985',
//   title: 'Village Among the Trees',
// };

export const getSavedArtworks = () => {
  const artworks = getStoreData('artworks')
  return (artworks) ? artworks : [];
};

export const addSavedArtworks = (artwork) => {
  saveArtworks([...getSavedArtworks(), artwork]);
}

export const clearSavedArtworks = () => {
  localStorage.setItem('artworks', '[]');
};
