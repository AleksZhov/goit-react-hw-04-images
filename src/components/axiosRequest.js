
const axios = require('axios').default;

async function axiosRequest(searchValue, page) {
  try {
    const responce = await axios({
      method: 'get',
      url: `https://pixabay.com/api/?key=28627521-5848128afb2ba35ac2477c3bc&q=${searchValue}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`,
    });
    return responce;
  } catch (error) {
    console.log(error);
  }
}

export default axiosRequest;
