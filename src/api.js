const BASE_URL = 'https://api.jobbug.site'; // base URL을 설정

// fetch wrapper 유틸리티 함수
export const apiFetch = (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`; // base URL + endpoint 결합
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error('Failed to fetch'));
      }
      return response.json(); // 응답을 JSON으로 파싱
    })
    .catch(error => {
      console.error('Fetch Error:', error);
      throw error;
    });
};


