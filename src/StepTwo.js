import React, { useState } from 'react';

function StepTwo({ nextStep }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [reward, setReward] = useState(''); // 빈 문자열로 기본 설정
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (title.length < 10 || content.length < 20 || !reward) {
      setErrorMessage('모든 필수 필드를 채워주세요.');
      return; // 에러 메시지를 출력하고 함수 실행 중단
    }
    setErrorMessage(''); // 에러 메시지를 초기화
    nextStep(); // 다음 단계로 이동
  };

  return (
    <div className="form-container">
      <h2>잡아주세요 게시글을 작성해주세요</h2>
      <label>1. 잡아주세요 게시글의 제목을 입력해주세요</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='최소 10글자 이상 입력해주세요' className={title.length < 10 ? 'error' : ''} />

      <label>2. 잡아주세요 게시글의 본문을 입력해주세요</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='최소 20글자 이상 입력해주세요' className={content.length < 20 ? 'error' : ''}></textarea>

      <label>3. 수락자에게 제공할 퇴치 보상을 입력해주세요</label>
      <select
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        className={!reward ? 'error' : ''}
      >
        <option value="">퇴치 보상 선택</option> {/* 기본값을 빈 값으로 설정 */}
        <option value="채팅 후 결정">채팅 후 결정</option>
        <option value="잡's 내공 100">잡's 내공 100</option>
        <option value="잡's 내공 50">잡's 내공 50</option>
        <option value="없음">없음</option>
      </select>

      {errorMessage && <div className="toast-message">{errorMessage}</div>}

      <div className="button-container">
        <button className="button secondary" onClick={handleNext}>다음</button>
      </div>
    </div>
  );
}

export default StepTwo;

