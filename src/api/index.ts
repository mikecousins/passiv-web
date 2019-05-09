import axios from 'axios';

export const getData = (url: string) => axios.get(url);
export const postData = (url: string, data: object) => axios.post(url, data);
export const putData = (url: string, data: object) => axios.put(url, data);
export const patchData = (url: string, data: object) => axios.patch(url, data);
export const deleteData = (url: string) => axios.delete(url);
