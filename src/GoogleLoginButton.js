import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // jwtDecode 제대로 가져오기
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./api";

const GoogleLoginButton = ({setIsLoggedIn}) => {
    const navigate = useNavigate();

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

  

    return (
        <button onClick 
        />
    );
};

export default GoogleLoginButton;
