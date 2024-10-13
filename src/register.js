import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // 변경 사항: {} 안에 jwtDecode 명시
import AddressSearch from './AddressSearch';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', nickname: '', address: '', detailAddress: '', phone: '', id: '', password: '', confirmPassword: ''
    });
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
    const [isPasswordMatching, setIsPasswordMatching] = useState(true);
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const onGoogleSuccess = (response) => {
        const decoded = jwtDecode(response.credential);  // JWT 디코딩
        console.log(decoded);  // 디코딩된 정보를 콘솔에 출력
        setFormData({ ...formData, name: decoded.name });  // 디코딩된 정보에서 이름을 추출하여 formData에 설정
        setIsLoggedIn(true);
    };

    const checkNicknameAvailability = () => {
        const nickname = formData.nickname;
        if (nickname) {
            fetch(`/api/nickname/check?nickname=${nickname}`)
                .then((response) => response.json())
                .then((data) => {
                    setIsNicknameAvailable(data.isAvailable);
                });
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
        if (isNicknameAvailable && isPasswordMatching && isPrivacyChecked) {
            navigate('/login');
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
