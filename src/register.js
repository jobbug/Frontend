import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // jwtDecode를 올바르게 import
import AddressSearch from './AddressSearch';
import './Register.css';
import { apiFetch } from './api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', nickname: '', address: '', detailAddress: '', phone: '', id: '', password: '', confirmPassword: ''
    });
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
    const [isPasswordMatching, setIsPasswordMatching] = useState(true);
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    const onGoogleSuccess = (response) => {
        const token = response.credential;

        if (isValidJwt(token)) {
            const decoded = decodeToken(token);
            if (decoded) {
                console.log('Login Success:', decoded);
                setFormData({ ...formData, name: decoded.name });
                setIsLoggedIn(true);
            } else {
                alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
            }
        } else {
            alert('잘못된 토큰입니다. 다시 시도해 주세요.');
        }
    };

    const checkNicknameAvailability = () => {
        const nickname = formData.nickname;
        const token = localStorage.getItem('registerToken');  // 로컬 스토리지에서 registerToken을 가져옴
    
        if (nickname && token) {  // 닉네임과 registerToken이 있는지 확인
            apiFetch(`/api/nickname/check?nickname=${nickname}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // registerToken을 헤더에 추가
                    'Content-Type': 'application/json'
                }
            })
            .then((data) => {
                setIsNicknameAvailable(data.isAvailable);  // 중복 확인 결과 반영
            })
            .catch((error) => {
                console.error("닉네임 중복 확인 에러:", error);
            });
        } else {
            console.error("닉네임이나 registerToken이 없습니다.");
            console.log('닉네임:', nickname, 'registerToken:', token);
        }
    };
    
    


    const handleAddressSelect = (selectedAddress) => {
        setFormData({ ...formData, address: selectedAddress });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trim()
        });
    };

    const handleSubmit = () => {
        const registerToken = localStorage.getItem('registerToken');  // registerToken을 가져옴
        const userInfo = { ...formData };
    
        if (isNicknameAvailable && isPasswordMatching && isPrivacyChecked && registerToken) {
            // 회원가입 요청
            apiFetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${registerToken}`,  // 회원가입 시 registerToken을 헤더에 추가
                },
                body: JSON.stringify(userInfo)  // 사용자 정보를 JSON 형식으로 전송
            })
            .then(response => {
                console.log("회원가입 성공:", response);
    
                // 회원가입 성공 시 registerToken을 삭제하고 로그인 페이지로 이동
                localStorage.removeItem('registerToken');  // 더 이상 필요하지 않으므로 registerToken 삭제
                navigate('/login');  // 로그인 페이지로 이동
            })
            .catch(error => {
                console.error("회원가입 에러:", error);
            });
        } else {
            console.error('회원가입 조건을 충족하지 않았습니다.');
        }
    };
    
    

    return (
        <div className="register-container">
            <h1>회원 가입</h1>

            {!isLoggedIn && (
                <GoogleOAuthProvider clientId="607941716422-goaocftar6hi9o8e0pv0roh8maqm34kk.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={onGoogleSuccess}
                        onError={(err) => console.error(err)}
                    />
                </GoogleOAuthProvider>
            )}

            <form>
                <label>이름</label>
                <input type="text" name="name" value={formData.name} readOnly />

                <label>닉네임</label>
                <div className="nickname-input">
                    <input type="text" name="nickname" onChange={handleChange} />
                    <button type="button" onClick={checkNicknameAvailability}>중복 확인</button>
                </div>
                {isNicknameAvailable === false && <p>이미 존재하는 닉네임입니다.</p>}
                {isNicknameAvailable === true && <p>사용 가능한 닉네임입니다.</p>}

                <label>주소</label>
                <AddressSearch onSelectAddress={handleAddressSelect} />
                <input type="text" name="address" value={formData.address} readOnly />

                <label>상세주소</label>
                <input type="text" name="detailAddress" onChange={handleChange} />

                <label>전화번호</label>
                <input type="text" name="phone" onChange={handleChange} />

                <div className="privacy-section">
                    <input type="checkbox" onChange={() => setIsPrivacyChecked(!isPrivacyChecked)} />
                    <label>
                        서비스 이용약관 및 <a href="https://leeinsunny.github.io/jobbug-privacy-policy/">개인정보처리방침</a>에 동의합니다.
                    </label>
                </div>

                <button type="button" onClick={handleSubmit}>회원가입</button>
            </form>
        </div>
    );
};

export default Register;
