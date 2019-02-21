import axios from 'axios';

const handleResponse = (response) => {
  let json = response.data;
  if (response.status >= 200 && response.status < 300) {
    return json;
  }
  else {
    return json.then(Promise.reject.bind(Promise));
  }
}


export const getData = (url = '') => {
  return axios.get(url).then(handleResponse);
};

export const postData = (url = '', data = {}) => {
  return axios.post(url, data).then(handleResponse);
};

export const postDataNoAuth = (url = '', data = {}) => {
  return axios.post(url, data).then(handleResponse);
};

export const putData = (url = '', data = {}) => {
  return axios.put(url, data).then(handleResponse);
};

export const patchData = (url = '', data = {}) => {
  return axios.patch(url, data).then(handleResponse);
};

export const deleteData = (url = '') => {
  return axios.delete(url).then(handleResponse);
};
