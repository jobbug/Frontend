// Modal.js
import React, { useState } from 'react';
import './styles.css'; // 기존 스타일에 모달 스타일을 추가할 예정

function Modal({ title, content, onClose }) {
  // 각 입력 필드의 상태를 관리하는 useState 사용
  const [selectedUser, setSelectedUser] = useState('');
  const [onTime, setOnTime] = useState(null);
  const [success, setSuccess] = useState(null);
  const [delayTime, setDelayTime] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  // 확인 버튼을 눌렀을 때 입력값을 검증하는 함수
  const handleConfirm = () => {
    if (reviewText.length < 12) {
      alert("후기는 최소 12글자 이상 작성해주세요.");
      return;
    }
    alert("평가가 성공적으로 제출되었습니다.");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>

        {/* 수락자 선택 섹션 */}
        <div className="modal-section">
          <label htmlFor="selectUser">1. 요청자를 선택해주세요</label>
          <select 
            id="selectUser" 
            value={selectedUser} 
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- 선택해주세요 --</option>
            <option value="홍길동">홍길동</option>
            <option value="오지만">오지만</option>
            <option value="이인정">이인정</option>
          </select>
        </div>

        {selectedUser && (
          <>
            {/* 도착 여부 확인 섹션 */}
            <div className="modal-section">
              <label>2. 수락자가 도착 약속 시간에 맞춰 도착했나요?</label>
              <div>
                <label>
                  <input 
                    type="radio" 
                    value="yes" 
                    checked={onTime === "yes"} 
                    onChange={() => setOnTime("yes")} 
                  /> 
                  예
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="no" 
                    checked={onTime === "no"} 
                    onChange={() => setOnTime("no")} 
                  /> 
                  아니오
                </label>
              </div>
            </div>

            {/* 지연 시간 선택 섹션 */}
            {onTime === "no" && (
              <div className="modal-section">
                <label htmlFor="delayTime">2-1. '아니요'를 선택한 경우 ) 다음 중 수락자의 도착 지연 시간을 선택해주세요</label>
                <select 
                  id="delayTime" 
                  value={delayTime} 
                  onChange={(e) => setDelayTime(e.target.value)}
                >
                  <option value="">-- 선택해주세요 --</option>
                  <option value="5~10분">5~10분</option>
                  <option value="10분 이상">10분 이상</option>
                  <option value="15분 이상">15분 이상</option>
                  <option value="20분 이상">20분 이상</option>
                  <option value="아예 안옴">오지 않음</option>
                </select>
              </div>
            )}

            {/* 퇴치 성공 여부 섹션 */}
            <div className="modal-section">
              <label>3. 수락자가 벌레 퇴치에 성공했나요?</label>
              <div>
                <label>
                  <input 
                    type="radio" 
                    value="yes" 
                    checked={success === "yes"} 
                    onChange={() => setSuccess("yes")} 
                  /> 
                  O
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="no" 
                    checked={success === "no"} 
                    onChange={() => setSuccess("no")} 
                  /> 
                  X
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="unknown" 
                    checked={success === "unknown"} 
                    onChange={() => setSuccess("unknown")} 
                  /> 
                  ! (퇴치 과정 중 벌레 사라짐, 약물 설치 등)
                </label>
              </div>
            </div>

            {/* 후기 작성 섹션 */}
            <div className="modal-section">
              <label htmlFor="reviewText">4. 수락자에 대한 후기를 작성해주세요</label>
              <textarea
                id="reviewText"
                placeholder="후기를 입력해주세요"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <small>최소 12글자 이상 작성해주세요.</small>
            </div>

            {/* 별점 선택 섹션 */}
            <div className="modal-section">
              <label>5. 수락자에 대한 별점을 매겨주세요</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={rating >= star ? 'active' : ''}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* 확인 및 취소 버튼 */}
            <div className="modal-actions">
              <button onClick={onClose}>취소</button>
              <button onClick={handleConfirm}>확인</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
