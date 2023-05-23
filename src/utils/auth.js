export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (!res.ok) {
      Promise.reject(res.status);
    } else {
      return res.json();
    }
  })
};

export const login = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (!res.ok) {
      Promise.reject(res.status);
    } else {
      return res.json();
    }
  })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => {
    if (!res.ok) {
      Promise.reject(res.status);
    } else {
      return res.json();
    }
  })
}