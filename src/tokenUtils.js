// tokenUtils.js
export const extractTokenFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('token');  // URL에서 token 파라미터 추출
};

export const storeToken = (token, isRegister) => {
    if (isRegister) {
        localStorage.setItem('registerToken', token);  // 회원가입 시 registerToken 저장
        console.log('registerToken 저장됨:', token);
    } else {
        localStorage.setItem('successToken', token);  // 로그인 성공 시 successToken 저장
        console.log('successToken 저장됨:', token);
    }
};
