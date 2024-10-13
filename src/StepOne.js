import React, { useState } from 'react';
import AddressSearch from './AddressSearch'; // 카카오 주소 검색 컴포넌트 불러오기

function StepOne({ nextStep }) {
  const [address, setAddress] = useState('');  // 주소
  const [detailedAddress, setDetailedAddress] = useState('');  // 세부 주소
  const [startTime, setStartTime] = useState(''); // 시작 시간
  const [endTime, setEndTime] = useState(''); // 종료 시간
  const [bugType, setBugType] = useState(''); // 벌레 종류
  const [customBug, setCustomBug] = useState(''); // 사용자가 입력한 벌레 종류
  const [isCustomBugCompleted, setIsCustomBugCompleted] = useState(false); // 벌레 종류 입력 완료 여부
  const [customBugList, setCustomBugList] = useState([]); // 사용자 입력 벌레 목록
  const [errorMessage, setErrorMessage] = useState('');

  // 주소 검색 버튼에서 선택된 주소를 받는 함수
  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  // 유효성 검사를 하고 다음 단계로 넘어가는 함수
  const handleNext = () => {
    if (!address || !startTime || !endTime || !bugType) {
      setErrorMessage('모든 필수 필드를 입력해주세요.');
      return;
    }
    if (startTime >= endTime) {
      setErrorMessage('종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }
    nextStep();
  };

    // 벌레 종류 입력 완료 버튼 처리
    const handleCompleteCustomBug = () => {
        const confirmResult = window.confirm(`${customBug}을(를) 벌레 종류로 설정하시겠습니까?`);
        if (confirmResult) {
        // 벌레 종류 목록에 추가
        setCustomBugList((prevList) => [...prevList, customBug]);
        setBugType(customBug); // 드롭다운에서 선택된 값으로 설정
        setIsCustomBugCompleted(true); // 완료 상태로 전환
        }
    };

  return (
    <div className="form-container">
      <h2>벌레 퇴치 기본 정보를 입력해주세요</h2>
     {/* 기본 주소 입력 */}
        <label>1. 벌레 퇴치를 원하는 장소를 입력해주세요</label>
        <div className="address-input-wrapper">
            <input type="text" placeholder="기본 주소 입력" value={address} readOnly />
            <AddressSearch onSelectAddress={handleAddressSelect} />
        </div>

    {/* 상세 주소 입력 */}
        <input
            type="text"
            placeholder="상세 주소 입력 (예: 123동 456호)"
            value={detailedAddress}
            onChange={(e) => setDetailedAddress(e.target.value)}
        />


      {/* 시작 시간 선택 */}
      <label>2. 벌레 퇴치 희망 시작 시간을 입력해주세요</label>
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

      {/* 종료 시간 선택 */}
      <label>3. 벌레 퇴치 희망 종료 시간을 입력해주세요</label>
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

      {/* 벌레 종류 선택 */}
      <label>4. 퇴치를 희망하는 벌레 종류를 입력해주세요</label>
      <select value={bugType} onChange={(e) => setBugType(e.target.value)}>
        <option value="">벌레 종류 선택</option>
        <option value="바퀴벌레">바퀴벌레</option>
        <option value="지네">지네</option>
        <option value="그리마">그리마</option>
        <option value="애벌레">애벌레</option>
        <option value="나방파리">나방파리</option>
        <option value="노린재">노린재</option>
        <option value="집나방">집나방</option>
        <option value="거미">거미</option>
        <option value="기타">기타</option>
         {/* 사용자 입력 벌레 종류 옵션을 동적으로 추가 */}
         {customBugList.map((bug, index) => (
          <option key={index} value={bug}>
            {bug}
          </option>
        ))}
      </select>




      {/* 벌레 종류가 '기타'일 경우, 사용자 입력 필드 */}
      {bugType === '기타' && !isCustomBugCompleted && (
        <div className="custom-bug-input">
            <input
            type="text"
            placeholder="벌레 종류를 입력해주세요"
            value={customBug}
            onChange={(e) => setCustomBug(e.target.value)}
            />
            <button onClick={handleCompleteCustomBug}>완료</button>
        </div>
        )}

 

      {errorMessage && <div className="toast-message">{errorMessage}</div>}

      <div className="button-container">
        <button className="button" onClick={handleNext}>다음</button>
      </div>
    </div>
  );
}

export default StepOne;
