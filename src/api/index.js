import axios from 'axios';

export const getData = url => axios.get(url);
export const postData = (url, data) => axios.post(url, data);
export const putData = (url, data) => axios.put(url, data);
export const patchData = (url, data) => axios.patch(url, data);
export const deleteData = url => axios.delete(url);
