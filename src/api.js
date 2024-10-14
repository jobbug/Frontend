const BASE_URL = 'https://api.jobbug.site'; 

export const apiFetch = (endpoint, options = {}, useRegisterToken = false) => {
  const token = useRegisterToken
    ? localStorage.getItem('registerToken')
    : localStorage.getItem('accessToken');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    ...options
  };

  const url = `${BASE_URL}${endpoint}`;

  return fetch(url, defaultOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error('Failed to fetch'));
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch Error:', error);
      throw error;
    });
};
