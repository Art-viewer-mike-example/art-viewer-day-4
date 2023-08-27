const BASE_URL = 'https://api.artic.edu';
const ARTWORKS_ROUTE = '/api/v1/artworks';

const fetchHandler = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const { ok, status, statusText } = res;
    if (!ok) throw new Error(`Fetch failed: ${status}, ${statusText || 'no statusText'}`);

    const data = await res.json();
    return [null, data];
  } catch (error) {
    console.warn(error.message);
    return [error, null]
  }
}

/**
 * Fetch a list of artworks by keyword with a maximum count
 * @param {string} keyword - The search string to use
 * @param {number} maxCount - The maximum number of artworks to return
 * @returns {Promise<[Artwork]>} An array of artworks
 */
export const fetchAllArtByKeyword = async ({ keyword = 'landscape', maxCount = 25 } = {}) => {
  const artworksByKeywordUrl = new URL(BASE_URL);
  // You can just use a string, but the URL object is more readable for long urls.
  // Plus, your keyword is automatically encoded for you!
  // https://developer.mozilla.org/en-US/docs/Web/API/URL

  artworksByKeywordUrl.pathname = `${ARTWORKS_ROUTE}/search`;
  artworksByKeywordUrl.searchParams.append('q', keyword);
  artworksByKeywordUrl.searchParams.append('limit', maxCount);
  artworksByKeywordUrl.searchParams.append('query[term][is_public_domain]', 'true');
  artworksByKeywordUrl.searchParams.append('fields', 'id,title,image_id,artwork_type_title');

  const [err, data] = await fetchHandler(artworksByKeywordUrl);
  if (err) return [];
  return data.data;
}

/**
 * Fetch a single artwork by id
 * @param {number} id - The id of the artwork to fetch (NOT THE image_id)
 * @returns {Promise<Artwork>} A single artwork object
 */
export const fetchArtworkById = async (id) => { // TODO add property filtering
  const [err, data] = await fetchHandler(`${BASE_URL}${ARTWORKS_ROUTE}/${id}`);
  if (err) return [err, null];
  return [null, data.data];
}