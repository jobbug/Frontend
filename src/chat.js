// src/chat.js
import React, { useEffect, useState } from 'react';
import './chat.css';  // chat.css 파일을 import

function Chat() {
  const [profileInfo, setProfileInfo] = useState({});
  const [isRequestor, setIsRequestor] = useState(true); // 요청자(true), 수락자(false)

  useEffect(() => {
    // 서버에서 프로필 정보를 불러오는 함수
    async function loadProfile(isRequestor) {
      let profileData;
      try {
        const response = await fetch(
          isRequestor ? '/api/acceptor-profile' : '/api/requestor-profile'
        );
        profileData = await response.json();
        setProfileInfo(profileData);
      } catch (error) {
        console.error('프로필 정보 로드 실패', error);
      }
    }

    loadProfile(isRequestor); // 요청자 또는 수락자에 따라 불러오기
  }, [isRequestor]);

  return (
    <div className="chat-container">
      {/* 채팅 목록 */}
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>채팅 목록</h2>
          <hr className="divider" />
          <ul id="chat-list-ul">{/* 채팅 목록 동적 추가 */}</ul>
        </div>
      </div>

      {/* 채팅 창 */}
      <div className="chat-window">
        <div className="chat-header">
          <h2 id="chat-title">{profileInfo.nickname || '상대방의 닉네임'}</h2>
          <hr className="divider" />
        </div>

        {/* 메시지 창 */}
        <div className="chat-body">
          <div className="message received">상대방의 메시지</div>
          <div className="message sent">내 메시지</div>
        </div>

        {/* 메시지 입력 창 */}
        <div className="chat-input">
          <input type="text" placeholder="메시지를 입력하세요." />
          <button>보내기</button>
        </div>
      </div>

      {/* 상대방 프로필 정보 */}
      <div className="profile-section">
        <div className="profile-header">
          <h2>프로필</h2>
          <hr className="divider" />
        </div>
        <div className="profile-content">
          <img
            src="상대방_프로필_이미지.png"
            alt="프로필 이미지"
            className="profile-image"
          />
          <p id="profile-name">{profileInfo.nickname || '인선이 벌레 싫어해'}</p>
          <p id="profile-location">{profileInfo.location || '서울특별시 노원구'}</p>
          <p id="profile-badge">{profileInfo.badge || '뱃지 정보'}</p>
        </div>

        <div className="profile-stats">
          <p id="request-count">
            {isRequestor
              ? `총 성공 횟수: ${profileInfo.successCount || 0}회`
              : `총 요청 횟수: ${profileInfo.requestCount || 0}회`}
          </p>
          <p id="bug-info">
            {isRequestor ? `가장 많이 잡은 벌레: ${profileInfo.topBug || ''}` : ''}
          </p>
        </div>

        <div className="request-history">
          <h4 id="history-title">{isRequestor ? '수락 내역' : '요청 내역'}</h4>
          <hr className="divider" />
          <ul id="request-history-ul">
            {profileInfo.history &&
              profileInfo.history.map((item, index) => (
                <li key={index} className="history-item">
                  <div className="history-details">
                    <span>{item.date}</span>
                    <span>{item.bug}</span>
                    {isRequestor && (
                      <span style={{ color: item.status === '성공' ? 'blue' : 'red' }}>
                        {item.status}
                      </span>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Chat;
