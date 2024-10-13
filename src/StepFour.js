import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 사용

function StepFour() {
  const navigate = useNavigate(); // 페이지 이동 함수 정의

  const handleHomeClick = () => {
    navigate('/home'); // home 페이지로 이동
  };

  return (
    <div className="form-container success-container">
      {/* 완료 메시지 */}
      <h2>잡아주세요 게시글 작성이 완료되었습니다.</h2>

      {/* 이미지 */}
      <img
        src="/images/jobpleasesuccess.svg"
        alt="게시글 작성 완료"
        className="success-image"
      />

      {/* 홈으로 버튼 */}
      <div className="button-container">
        <button className="home-button" onClick={handleHomeClick}>
          홈으로
        </button>
      </div>
    </div>
  );
}

export default StepFour;
