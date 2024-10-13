import React from 'react';
import './styles.css';  // 스타일을 적용하려면 필요
import { apiFetch } from './api';

const Login = () => {
    // 구글 로그인 버튼 클릭 시 호출되는 함수
    const handleGoogleLogin = async () => {
        await apiFetch('/oauth2/authorization/google', {method: 'POST'}) // 백엔드의 구글 OAuth URL로 리디렉션
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <img src={`${process.env.PUBLIC_URL}/images/jobbuggarologo.svg`} alt="Jobbug Logo" className="logo" />
                
                <button className="google-login-btn" onClick={handleGoogleLogin}>
                    구글로 로그인
                </button>

                <div className="signup-section">
                    <p>아직 회원이 아닌가요? <a href="/register" className="signup-link">회원가입 하러가기</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
