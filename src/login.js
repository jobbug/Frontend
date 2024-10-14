import React, { useEffect } from 'react';
import './styles.css';  // 스타일을 적용하려면 필요
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    // 구글 로그인 버튼 클릭 시 호출되는 함수
    const handleGoogleLogin = () => {
        // 구글 OAuth URL로 직접 리디렉션
        window.location.href = 'https://api.jobbug.site/oauth2/authorization/google';
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');  // URL에서 token 파라미터 추출
    
        if (token) {
            // URL에서 'register'가 있으면 처음 로그인으로 간주
            if (window.location.pathname.includes('register')) {
                localStorage.setItem('registerToken', token);  // registerToken을 저장
                console.log('registerToken 저장됨:', token);
                navigate('/register');  // 회원가입 페이지로 이동
            } else {
                // 이미 로그인된 사용자는 accessToken으로 처리
                localStorage.setItem('accessToken', token);  // accessToken을 저장
                console.log('accessToken 저장됨:', token);
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
