const FOURSQUARE_API = 'https://api.foursquare.com/v2/venues/search?';
// This is the center of El Born in Barcelona
const LL = '41.384457,2.182452';
const RADIUS = '250';
// Number of results to return
const LIMIT = '11';
// The categories are: Bed & Breakfast, Coffee Shop and Museum
const CATEGORY_ID = '4bf58dd8d48988d1f8931735,4bf58dd8d48988d1e0931735,4bf58dd8d48988d181941735';

const CLIENT_ID = 'ZB1CWJ0A2QQHQ1XFGTOEYU4QR5E0B3T2HWYCWOUM3UFXPDD0';
const CLIENT_SECRET = 'GZHGKGTLETJF3V0NXUUTS042TAL0PBWJIPGKE1ONEJLZZYVL';
const V = '20190115';



const param = {
  method:'GET'
}

// This function returns an object with all venues
// that match the url criteria
export const getAll = () =>
  fetch(`${FOURSQUARE_API}ll=${LL}&radius=${RADIUS}&limit=${LIMIT}&categoryId=${CATEGORY_ID}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${V}`, param)
    .then(res => res.json())
    .then(data => data.response).catch(error => console.log(error))
