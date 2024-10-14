const BASE_URL = 'https://api.jobbug.site'; // base URL을 설정

// fetch wrapper 유틸리티 함수
export const apiFetch = (endpoint, options = {}, useRegisterToken = false) => {
  // useRegisterToken이 true이면 registerToken을 사용하고, 그렇지 않으면 accessToken을 사용
  const token = useRegisterToken
    ? localStorage.getItem('registerToken')
    : localStorage.getItem('accessToken');

  // 기본 옵션 설정 (headers 추가)
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',  // 기본 Content-Type 설정
      ...(token && { 'Authorization': `Bearer ${token}` }) // 토큰이 있으면 Authorization 헤더에 추가
    },
    ...options // 추가로 전달된 옵션을 병합
  };

  const url = `${BASE_URL}${endpoint}`; // base URL + endpoint 결합

  return fetch(url, defaultOptions) // 기본 옵션과 병합된 옵션으로 fetch 요청
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
