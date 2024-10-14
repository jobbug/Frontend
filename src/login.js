import React, { useEffect } from 'react';
import './styles.css';  // 스타일을 적용하려면 필요
import { useNavigate } from 'react-router-dom';
import { extractTokenFromUrl, storeToken } from './tokenUtils';  // 유틸리티 함수 import


const Login = () => {
    const navigate = useNavigate();

    // 구글 로그인 버튼 클릭 시 호출되는 함수
    const handleGoogleLogin = () => {
        // 구글 OAuth URL로 직접 리디렉션
        window.location.href = 'https://api.jobbug.site/oauth2/authorization/google';
    };

    useEffect(() => {
        const token = extractTokenFromUrl();  // URL에서 token 파라미터 추출
    
        if (token) {
            const isRegister = window.location.pathname.includes('register');
            storeToken(token, isRegister);  // 토큰 저장 (회원가입인지 여부에 따라 다르게 처리)
            
            if (isRegister) {
                navigate('/register');  // 회원가입 페이지로 이동
            } else {
                navigate('/');  // 메인 페이지로 이동
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
