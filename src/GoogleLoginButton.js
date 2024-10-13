import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // jwtDecode 제대로 가져오기

const GoogleLoginButton = () => {
    const clientId = '607941716422-goaocftar6hi9o8e0pv0roh8maqm34kk.apps.googleusercontent.com';  // clientId 문자열로 설정

    const isValidJwt = (token) => {
        const parts = token.split('.');
        return parts.length === 3;  // JWT는 3개의 부분으로 구성됨
    };

    const decodeToken = (token) => {
        try {
            return jwtDecode(token);  // JWT 디코딩
        } catch (e) {
            console.error("토큰 디코딩 중 오류 발생:", e);
            return null;
        }
    };

    const onGoogleSuccess = (response) => {
        const token = response.credential;

        if (isValidJwt(token)) {
            const decoded = decodeToken(token);
            if (decoded) {
                console.log('Login Success:', decoded);
                localStorage.setItem('accessToken', token);  // 유효한 토큰이면 저장
            } else {
                alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
            }
        } else {
            console.error("잘못된 JWT 형식");
            alert("잘못된 토큰입니다. 다시 시도해 주세요.");
        }
    };

    return (
        <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={(err) => console.log('Login Failed:', err)}
        />
    );
};

export default GoogleLoginButton;
