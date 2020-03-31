import request from 'superagent';

async function loadProducts(pageUrl) {
  // Original api will create CORS problem in localhost environment
  // So I use cors-anywhere to fix it in dev environment
  // The better choice it to allow request from localhost in the service side.
  const url = 'https://cors-anywhere.herokuapp.com/http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com' + pageUrl;
  const response = await request.get(url);

  if (response.text) {
    return JSON.parse(response.text);
  }
  return response;
}

export default loadProducts;
