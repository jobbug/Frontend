import React from "react";
import GoogleLoginButton from './GoogleLoginButton';  // GoogleLoginButton 컴포넌트 import
import './styles.css';  // 로그인 페이지 스타일링 import

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <img src={`${process.env.PUBLIC_URL}/images/jobbuggarologo.svg`} alt="Jobbug Logo" className="logo" />
                
                <GoogleLoginButton />  {/* Google 로그인 버튼 표시 */}
                
                <div className="signup-section">
                    <p>아직 회원이 아닌가요? <a href="/register" className="signup-link">회원가입 하러가기</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
