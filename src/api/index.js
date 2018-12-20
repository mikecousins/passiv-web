

const handleResponse = (response) => {
  let json = response.json().catch(() => null);
  if (response.status >= 200 && response.status < 300) {
    return json;
  }
  else {
    return json.then(Promise.reject.bind(Promise));
  }
}


export const getData = (url = '') => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Authorization": "JWT " + localStorage.getItem('jwt'),
    },
  })
  .then(handleResponse);
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
  .then(handleResponse);
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
  .then(handleResponse);
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
  .then(handleResponse);
};

export const deleteData = (url = '') => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Authorization": "JWT " + localStorage.getItem('jwt'),
    },
  })
  .then(handleResponse);
};
