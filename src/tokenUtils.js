export const extractTokenFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('token');
};

export const storeToken = (token, isRegister) => {
    if (isRegister) {
        localStorage.setItem('registerToken', token);
        console.log('registerToken 저장됨:', token);
    } else {
        localStorage.setItem('accessToken', token);
        console.log('accessToken 저장됨:', token);
    }
};
