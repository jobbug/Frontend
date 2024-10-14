import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 
import AddressSearch from './AddressSearch';
import './Register.css';
import { apiFetch } from './api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', nickname: '', address: '', detailAddress: '', phone: '', id: '', password: '', confirmPassword: ''
    });
    const [profilePicture, setProfilePicture] = useState('');
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
    const [isPasswordMatching, setIsPasswordMatching] = useState(true);
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const registerToken = queryParams.get('token'); 

        if (registerToken) {
            localStorage.setItem('registerToken', registerToken); 
            console.log('registerToken 저장됨:', registerToken);
        } else {
            console.error('URL에 registerToken이 없습니다.');
        }
    }, []);

    const onGoogleSuccess = (response) => {
        const token = response.credential;

        const isValidJwt = (token) => {
            const parts = token.split('.');
            return parts.length === 3; 
        };

        const decodeToken = (token) => {
            try {
                return jwtDecode(token); 
            } catch (e) {
                console.error("토큰 디코딩 중 오류 발생:", e);
                return null;
            }
        };

        if (isValidJwt(token)) {
            const decoded = decodeToken(token);
            if (decoded) {
                console.log('Login Success:', decoded);
                const fullName = `${decoded.family_name}${decoded.given_name}`;
                setFormData({ ...formData, name: fullName });
                setProfilePicture(decoded.picture);  
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
        const registerToken = localStorage.getItem('registerToken');  // 로컬 스토리지에서 registerToken을 가져옴
    
        if (nickname && registerToken) {  // 닉네임과 registerToken이 있는지 확인
            apiFetch(`/api/user/duplicate?nickname=${nickname}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${registerToken}`,  // Authorization 헤더에 registerToken 추가
                    'Content-Type': 'application/json'
                }
            }, true)  // useRegisterToken을 true로 설정
            .then((data) => {
                if (data.code === 200) {
                    setIsNicknameAvailable(true);  // 중복 확인 결과 반영 (사용 가능)
                }
            })
            .catch((error) => {
                if (error.message.includes('400')) {
                    setIsNicknameAvailable(false);  // 중복된 닉네임 처리 (사용 불가)
                } else {
                    console.error("닉네임 중복 확인 에러:", error);
                }
            });
        } else {
            console.error("닉네임이나 registerToken이 없습니다.");
            console.log('닉네임:', nickname, 'registerToken:', registerToken);
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
        if (formData.password !== formData.confirmPassword) {
            setIsPasswordMatching(false);
            return;
        }
        setIsPasswordMatching(true);

        const registerToken = localStorage.getItem('registerToken');
        
        if (isNicknameAvailable && isPasswordMatching && isPrivacyChecked && registerToken) {
            const userInfo = {
                ...formData,
                profile: profilePicture  
            };
            
            apiFetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${registerToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo)  
            })
            .then(response => {
                console.log("회원가입 성공:", response);
                navigate('/login');
            })
            .catch(error => {
                console.error("회원가입 중 에러 발생:", error);
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

                <label>아이디</label>
                <input type="text" name="id" onChange={handleChange} />

                <label>비밀번호</label>
                <input type="password" name="password" onChange={handleChange} />
                
                <label>비밀번호 확인</label>
                <input type="password" name="confirmPassword" onChange={handleChange} />
                {!isPasswordMatching && <p>비밀번호가 일치하지 않습니다.</p>}

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
