import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import './styles.css';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleLoginSuccess = (decoded, token) => {
        setUserName(decoded.name);  // 구글에서 받은 사용자 이름 설정
        localStorage.setItem('accessToken', token);  // 토큰을 로컬 스토리지에 저장
        setIsLoggedIn(true);
        navigate('/');  // 로그인 성공 시 홈으로 리다이렉트
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={`${process.env.PUBLIC_URL}/images/jobbuggarologo.svg`} alt="Jobbug Logo" className="logo" />

                {isLoggedIn ? (
                    <p>{userName}님 환영합니다!</p>
                ) : (
                    <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
                )}

                {!isLoggedIn && (
                    <div className="signup-section">
                        <p>아직 회원이 아닌가요? <a href="/register" className="signup-link">회원가입 하러가기</a></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
