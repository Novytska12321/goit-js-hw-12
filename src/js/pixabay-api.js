import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com';
export const fetchPhotos = async (searchValue, page) => {
   
    const axiosOptions = {
        params: {
           q: searchValue,
        image_type: 'photos',
        orientation: 'horizontal',
        safesearch: true,
            key: '46112845-f959e042da8238bb9faecb37a', 
            per_page: 15,
        page: page,
        }
    }
    const response = await axios.get(`/api/`, axiosOptions);
    return response.data;
}