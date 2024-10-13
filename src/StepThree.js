import React, { useState } from 'react';

function StepThree({ nextStep, skipStep }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEmoticon, setSelectedEmoticon] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);  // "다음" 버튼 활성화 상태

  // 파일이 변경되었을 때의 처리 함수
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsNextEnabled(true);  // 파일 업로드 시 "다음" 버튼 활성화
  };

  // "다음" 버튼 클릭 시 처리 함수
  const handleNext = () => {
    if (!selectedEmoticon) {
      setErrorMessage('벌레를 가릴 이모티콘을 선택해주세요.');
    } else {
      nextStep();
    }
  };

  // 이모티콘 선택 처리 함수
  const handleEmoticonSelect = (index) => {
    setSelectedEmoticon(index);
  };

  return (
    <div className="form-container">
      <label>4. 벌레 사진을 업로드해주세요 (선택)</label>
      
      {/* 파일 업로드를 위한 숨겨진 input과 이미지를 클릭했을 때 파일 선택 가능하도록 설정 */}
      <div className="upload-container">
        <label htmlFor="file-upload">
          {!selectedFile && (
            <img
              src="images/bugimageupload.svg"  // 이미지 경로 설정
              alt="bug upload"
              className="upload-placeholder"   // CSS 클래스 추가
            />
          )}
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}  // 선택된 파일 미리보기
              alt="uploaded bug"
              className="uploaded-image"  // CSS 클래스 추가
            />
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          style={{ display: 'none' }}  // input을 숨김
          onChange={handleFileChange}
        />
      </div>

      {/* 5번 문항 - 이미지 업로드 후 노출 */}
      {selectedFile && (
        <>
          <label>5. 사진 속 벌레를 가릴 이모티콘을 선택해주세요</label>
          <div className="emoji-grid">
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className={`emoji-cell ${selectedEmoticon === index ? 'selected' : ''}`}
                onClick={() => handleEmoticonSelect(index)}
              >
                <img
                  src={`images/이모티콘_${index + 1}.svg`}
                  alt={`emoticon ${index + 1}`}
                  className="emoji-icon"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* 에러 메시지 */}
      {errorMessage && <div className="toast-message">{errorMessage}</div>}

      <div className="button-container">
        {/* 건너뛰기 버튼 */}
        <button
          className={`button secondary ${selectedFile ? 'disabled' : ''}`}  // 업로드 후 비활성화
          onClick={skipStep}
          disabled={!!selectedFile}  // 파일이 업로드되면 비활성화
        >
          건너뛰기
        </button>
        
        {/* 다음 버튼 */}
        <button 
          className="button" 
          onClick={handleNext} 
          disabled={!isNextEnabled}  // 이미지 업로드 전에는 비활성화
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default StepThree;
