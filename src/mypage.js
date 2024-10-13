import React, { useEffect, useState } from 'react';
import './mypage.css'; // CSS 파일 import

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [recentAction, setRecentAction] = useState(null);
  const [requestHistory, setRequestHistory] = useState([]);
  const [acceptHistory, setAcceptHistory] = useState([]);
  const token = localStorage.getItem('accessToken'); // 토큰 가져오기

  useEffect(() => {
    // 유저 정보 가져오기
    async function fetchUserInfo() {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (result.code === 200) {
          setUserInfo(result.data); // 유저 정보 설정
        }
      } catch (error) {
        console.error('유저 정보 조회 실패', error);
      }
    }

    // 진행 중인 요청/수락 상태 가져오기
    async function fetchRecentAction() {
      try {
        // 진행중인 요청 내역 조회
        const requestResponse = await fetch('/api/request?status=in_progress', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const requestResult = await requestResponse.json();

        // 진행중인 수락 내역 조회
        const acceptResponse = await fetch('/api/acceptance?status=in_progress', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const acceptResult = await acceptResponse.json();

        // 가장 최근의 진행 상태 확인 (우선 수락 내역을 우선으로 표시)
        if (acceptResult.data.requests.length > 0) {
          setRecentAction({ type: 'accept', detail: acceptResult.data.requests[0] });
        } else if (requestResult.data.requests.length > 0) {
          setRecentAction({ type: 'request', detail: requestResult.data.requests[0] });
        }
      } catch (error) {
        console.error('진행 중인 요청/수락 상태 조회 실패', error);
      }
    }

    // 요청 내역 및 수락 내역 가져오기
    async function fetchHistory() {
      try {
        // 요청 내역 조회
        const requestResponse = await fetch('/api/request', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const requestResult = await requestResponse.json();

        // 수락 내역 조회
        const acceptResponse = await fetch('/api/acceptance', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const acceptResult = await acceptResponse.json();

        if (requestResult.code === 200) {
          setRequestHistory(requestResult.data.requests); // 요청 내역 설정
        }

        if (acceptResult.code === 200) {
          setAcceptHistory(acceptResult.data.requests); // 수락 내역 설정
        }
      } catch (error) {
        console.error('요청/수락 내역 조회 실패', error);
      }
    }

    fetchUserInfo();
    fetchRecentAction();
    fetchHistory();
  }, [token]);

  return (
    <div className="content-container">
      {/* 유저 프로필 카드 */}
      <div className="box profile-box">
        {userInfo ? (
          <>
            <div className="profile-picture">
              <img src={userInfo.profileImageUrl || 'default.png'} alt="프로필 사진" />
            </div>
            <div className="profile-info">
              <div className="profile-name">{userInfo.name}</div>
              <div className="profile-nickname">{userInfo.nickname}</div>
              <a href="myedit.html" className="edit-button">수정하기</a>
            </div>
          </>
        ) : (
          <div>유저 정보를 불러오는 중입니다...</div>
        )}
      </div>

      {/* 진행 중인 요청/수락 */}
      <div className="box current-box">
        <div className="status-title">진행 중인 요청/수락</div>
        <div className="status-action-row"> {/* Flexbox 컨테이너로 상태와 버튼을 같은 라인에 */}
          {recentAction ? (
            <div className="status-detail">
              {recentAction.type === 'accept'
                ? `${recentAction.detail.nickname}님의 요청 수락중`
                : '나의 요청 진행 중'}
            </div>
          ) : (
            <div className="status-detail no-action">진행 중인 요청/수락이 없습니다.</div>
          )}
          <a href="#" className="detail-button">상세보기</a>
        </div>
        <hr className="divider" />
        <div className="badge">
          <div>🏴 바퀴벌레 학살자</div>
          <div>❤️ 고수</div> {/* 뱃지를 세로로 나열 */}
        </div>
      </div>

      {/* 요청 내역 보기 */}
      <div className="box request-history-box">
        <h2>요청 내역 보기</h2>
        <div className="total-count">총 <span style={{ color: 'green' }}>{requestHistory.length}</span>회</div>
        <hr className="divider" />
        {requestHistory.length > 0 ? (
          <ul className="history-list">
            {requestHistory.map((item) => (
              <li className="history-item" key={item.postId}>
                <span className="date">{new Date(item.createdAt).toLocaleDateString()}</span>
                <span className="bug-type">{item.type}</span>
                <a href="myrequest.html" className="arrow-button">→</a>
              </li>
            ))}
          </ul>
        ) : (
          <div>요청 내역이 없습니다.</div>
        )}
      </div>

      {/* 수락 내역 보기 */}
      <div className="box accept-history-box">
        <h2>수락 내역 보기</h2>
        <div className="total-count">총 <span style={{ color: 'blue' }}>{acceptHistory.length}</span>회</div>
        <hr className="divider" />
        {acceptHistory.length > 0 ? (
          <ul className="history-list">
            {acceptHistory.map((item) => (
              <li className="history-item" key={item.postId}>
                <span className="date">{new Date(item.createdAt).toLocaleDateString()}</span>
                <span className="bug-type">{item.type}</span>
                <span className="rating">평점: {item.review ? `${item.review.point}/5` : 'N/A'}</span>
                <button className="success-button">
                  {item.review ? (item.review.isSuccess === 'O' ? '성공' : '실패') : '미완료'}
                </button>
                <a href="myaccept.html" className="arrow-button">→</a>
              </li>
            ))}
          </ul>
        ) : (
          <div>수락 내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
