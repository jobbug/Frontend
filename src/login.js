import React, { useEffect } from 'react';
import './styles.css'; 
import { useNavigate } from 'react-router-dom';
import { extractTokenFromUrl, storeToken } from './tokenUtils';

const Login = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        window.location.href = 'https://api.jobbug.site/oauth2/authorization/google';
    };

    useEffect(() => {
        const token = extractTokenFromUrl(); 

        if (token) {
            const isRegister = window.location.pathname.includes('register');
            storeToken(token, isRegister);
            
            if (isRegister) {
                navigate('/register');
            } else {
                navigate('/');
            }
        } else {
            console.error('URL에서 토큰이 전달되지 않았습니다.');
        }
    }, [navigate]);

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
