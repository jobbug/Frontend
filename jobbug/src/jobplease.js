// 수정된 JobPlease.js
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

function JobPlease() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const skipStep = () => {
    setStep((prevStep) => prevStep + 1);  // 단계 넘어가기
  };

  return (
    <div className="jobplease-container">
      <div className="form-wrapper"> 
        <div className="step-indicator">
          <div className={step === 1 ? 'active-step' : step > 1 ? 'completed-step' : ''}>
            <div className="step-number">1</div>
            <span>벌레 퇴치 기본 정보 입력</span>
          </div>
          <div className={step === 2 ? 'active-step' : step > 2 ? 'completed-step' : ''}>
            <div className="step-number">2</div>
            <span>잡아주세요 게시글 작성</span>
          </div>
          <div className={step === 3 ? 'active-step' : step > 3 ? 'completed-step' : ''}>
            <div className="step-number">3</div>
            <span>사진 업로드 (선택) </span>
          </div>
          <div className={step === 4 ? 'active-step' : step > 4 ? 'completed-step' : ''}>
            <div className="step-number">4</div>
            <span>완료 </span>
          </div>
        </div>

        {/* 입력 폼 영역 */}
        {step === 1 && <StepOne nextStep={nextStep} />}
        {step === 2 && <StepTwo nextStep={nextStep} />}
        {step === 3 && <StepThree nextStep={nextStep} skipStep={skipStep} />}  
        {step === 4 && <StepFour nextStep={nextStep} />}
      </div>
    </div>
  );
}

export default JobPlease;
