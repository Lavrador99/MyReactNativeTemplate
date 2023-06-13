import axios from 'axios';

export const swrFetcher = (url: string, headers: any, params: any) => {
  return axios
    .get(url, {params: params, headers: headers})
    .then(({data}) => data);
};

export const API_URL = 'https://';
