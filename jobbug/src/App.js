// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles.css'; 
import Home from './home';
import JobPlease from './jobplease';
import Chat from './chat';
import MyPage from './mypage';
import Modal from './modal';

function App() {
  // isModalOpen, modalContent = 모달을 제어하기 위한 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  // +버튼 클릭했을 때 Open Modal 함수가 실행되어 모달이 열림
  const openModal = (title, content) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const [selectedAddress, setSelectedAddress] = useState(null);


  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
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
                  <a href="#">로그인</a>
                  <a href="#">로그아웃</a>
                  <a href="#">회원가입</a>
                  <span>Nick McMillan</span>
                  <img src={`${process.env.PUBLIC_URL}/images/defaultprofile.svg`} alt="Profile Picture" />
                </div>
              </header>

                <Routes>
                  <Route path="/home" element={<Home setSelectedAddress={setSelectedAddress} />} />
                  <Route path="/jobplease" element={<JobPlease />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </div>
        </div>
        
        {/* 모달 띄우기 */}
        {isModalOpen && (
          <Modal title={modalContent.title} content={modalContent.content} onClose={closeModal} />
        )}
      </div>
    </Router>
  );
}

export default App;
