// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import jwt_decode, { jwtDecode } from 'jwt-decode'; // 기본 내보내기 사용
import { GoogleOAuthProvider } from '@react-oauth/google'; // GoogleOAuthProvider 추가
import './styles.css'; 
import Home from './home';
import JobPlease from './jobplease';
import Chat from './chat';
import MyPage from './mypage';
import Modal from './modal';
import Login from './login';  
import Register from './register';
import { apiFetch } from './api';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 제어
  const [modalContent, setModalContent] = useState({ title: '', content: '' });  // 모달 내용 설정
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        // 토큰을 확인하여 로그인 상태 유지 및 사용자 정보 업데이트
        const decodedToken = jwtDecode(token); // jwt-decode를 사용하여 안전하게 디코딩
        setIsLoggedIn(true);
        setUserName(decodedToken.name); // 디코딩된 토큰에서 사용자 이름 추출
      } catch (error) {
        console.error("토큰 디코딩 중 오류 발생:", error);
        localStorage.removeItem('accessToken'); // 잘못된 토큰일 경우 삭제
      }
    }
  }, []);

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 로그아웃 요청 함수
  const handleLogout = async () => {
    if (window.confirm("정말 잡버그를 로그아웃 하시겠습니까?")) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        alert("로그인 상태가 아닙니다.");
        return;
      }
      console.log(accessToken);

      try {
        const response = await apiFetch('/api/user/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`, // 토큰을 헤더에 추가
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        if (response.ok && result.code === 200) {
          // 로그아웃 성공 처리
          localStorage.removeItem('accessToken'); // 토큰 삭제
          setIsLoggedIn(false); // 로그인 상태 해제
          alert("성공적으로 로그아웃되었습니다.");
          window.location.href = '/login';  // 페이지 리로드 후 로그인 페이지로 이동
        } else {
          alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("로그아웃 중 에러 발생:", error);
        alert("로그아웃에 실패했습니다. 네트워크를 확인해주세요.");
      }
    }
  };

  // 모달 열기 함수 (예시)
  const openModal = (title, content) => {
    setModalContent({ title, content });
    setIsModalOpen(true); // 모달 열기
  };

  return (
    <GoogleOAuthProvider clientId="607941716422-goaocftar6hi9o8e0pv0roh8maqm34kk.apps.googleusercontent.com">
      <Router>  {/* 반드시 Router 안에 전체 컴포넌트들이 위치해야 useNavigate가 정상 동작 */}
        <div className="app-container">
          <div className="sidebar">
            <div className="logo">
              <img src={`${process.env.PUBLIC_URL}/images/jobbugwonlogo.svg`} alt="Jobbug Logo" />
            </div>
            <ul className="menu">
              <li>
                <Link to="/home">
                  <img src={`${process.env.PUBLIC_URL}/images/homeblackicon.svg`} alt="Home Icon" className="menu-icon" />
                  홈
                </Link>
              </li>
              <li>
                <Link to="/jobplease">
                  <img src={`${process.env.PUBLIC_URL}/images/jobpleaseicon.svg`} alt="Job Please Icon" className="menu-icon" />
                  잡아주세요
                </Link>
              </li>
              <li>
                <Link to="/chat">
                  <img src={`${process.env.PUBLIC_URL}/images/chaticon.svg`} alt="Chat Icon" className="menu-icon" />
                  채팅
                </Link>
              </li>
              <li>
                <Link to="/mypage">
                  <img src={`${process.env.PUBLIC_URL}/images/mypageicon.svg`} alt="My Page Icon" className="menu-icon" />
                  마이페이지
                </Link>
              </li>
            </ul>

            {/* 카드 영역 (모달 버튼 포함) */}
            <div className="info-cards">
              <div className="card teal">
                <div className="card-header">
                  <span>빠른 후기 작성하기</span>
                  <img src={`${process.env.PUBLIC_URL}/images/whitethree.svg`} alt="Option Icon" className="three-icon" />
                </div>
                <div className="card-value">2</div>
                <button className="plus-icon-btn" onClick={() => openModal('빠른 후기 작성하기', '다음의 항목들을 입력해주세요')}>
                  <img src={`${process.env.PUBLIC_URL}/images/plusicon.svg`} alt="Plus Icon" />
                </button>
              </div>
              
              <div className="card green">
                <div className="card-header">
                  <span>나한테 작성된 후기 보기</span>
                  <img src={`${process.env.PUBLIC_URL}/images/whitethree.svg`} alt="Option Icon" className="three-icon" />
                </div>
                <div className="card-value">5</div>
                <button className="plus-icon-btn" onClick={() => openModal('나한테 작성된 후기 보기', '다음의 항목들을 입력해주세요')}>
                  <img src={`${process.env.PUBLIC_URL}/images/plusicon.svg`} alt="Plus Icon" />
                </button>
              </div>

              <div className="card yellow">
                <div className="card-header">
                  <span>진행 중인 요청</span>
                  <img src={`${process.env.PUBLIC_URL}/images/whitethree.svg`} alt="Option Icon" className="three-icon" />
                </div>
                <div className="card-value">1</div>
                <button className="plus-icon-btn" onClick={() => openModal('진행 중인 요청', '진행 중인 요청을 확인할 수 있습니다.')}>
                  <img src={`${process.env.PUBLIC_URL}/images/plusicon.svg`} alt="Plus Icon" />
                </button>
              </div>
            </div>
          </div>

          <div className="main-content-container">
            <div className="main-content">
                {/* 공통 Header */}
                <header className='header'>
                  <div className="auth-links">
                    {!isLoggedIn ? (
                      <>
                        <Link to="/login">로그인</Link>
                        <Link to="/register">회원가입</Link>
                      </>
                    ) : (
                      <>
                        <span>{userName}님 환영합니다!</span>
                        <button onClick={handleLogout} className="logout-btn">로그아웃</button>
                      </>
                    )}
                  </div>
                </header>

                <Routes>
                  <Route path="/home" element={<Home setSelectedAddress={setSelectedAddress} />} />
                  <Route path="/jobplease" element={<JobPlease />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </div>
          </div>

          {/* 모달 띄우기 */}
          {isModalOpen && (
            <Modal title={modalContent.title} content={modalContent.content} onClose={closeModal} />
          )}
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
