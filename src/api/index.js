
const handleNoContentResponse = (response) => {
  if (response.status === 204) {
    return null;
  }
  else {
    return response.json();
  }
}


export const getData = (url = '') => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Authorization": "JWT " + localStorage.getItem('jwt'),
    },
  })
  .then(response => response.json());
};

export const postData = (url = '', data = {}) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Authorization": "JWT " + localStorage.getItem('jwt'),
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json());
};

export const putData = (url = '', data = {}) => {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Authorization": "JWT " + localStorage.getItem('jwt'),
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json());
};

export const patchData = (url = '', data = {}) => {
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Authorization": "JWT " + localStorage.getItem('jwt'),
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json());
};

export const deleteData = (url = '') => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Authorization": "JWT " + localStorage.getItem('jwt'),
    },
  })
  .then(response => handleNoContentResponse(response));
};
