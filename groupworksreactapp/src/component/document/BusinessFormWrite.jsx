import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import {
    DocSheet, DocHeader, DocTable, ChoiceGroup, DocFooter, DocActions,
    ApprovalLine, ApproverPicker, APPROVAL_ROLES, today,
} from './ApprovalDoc';

Modal.setAppElement('#root');

const BusinessTripFormWrite = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyMember, setCompanyMember] = useState([]);
  const [currentApplyType, setCurrentApplyType] = useState('');
  const [content, setContent] = useState('');
  const [sign, setSign] = useState('');
  const [loginMember, setLoginMember] = useState([]);
  const [vacationDate, setVacationDate] = useState({
    startTime: '',
    finishTime: ''
  });
  const [selectApply, setSelectApply] = useState({
    firstApply: {name:'', no:''},
    midApply: {name:'', no:''},
    lastApply: {name:'', no:''},
  });

  const fetchCompanyMember = () => {
    fetch(`http://127.0.0.1:8888/app/api/business-trip-form/member?companyNo=${loginMember.companyNo}`, {
      method: 'GET',
      headers : {
        'Content-Type' : 'application/json'
      },
    })
    .then( resp => resp.json() )
    .then( data => {
      console.log(data);
      if(data.msg === 'good' && data.memberList){
        setCompanyMember(data.memberList);
      }
    } );
  };

  const handleOpenModal = (applyType) => {
    setIsModalOpen(true);
    setCurrentApplyType(applyType);
    fetchCompanyMember();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectMember = (member, event) => {
    console.log(member);
    event.stopPropagation();
    setSelectApply(prev => ({
      ...prev,
      [currentApplyType]: { name: member.name, no: member.no, sub: member.positionName }
    }));
    handleCloseModal();
  };
  useEffect(() => {
    console.log(selectApply); // 상태 업데이트 확인
  }, [selectApply]);

  const loginMemberNo = sessionStorage.getItem("loginMemberNo");
  const queryParam = encodeURIComponent(loginMemberNo);

  const url = `http://127.0.0.1:8888/app/api/business-trip-form/login-member?no=${queryParam}`;
  const fetchLoginMember = () => {
    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => {
        if(data.msg === 'good' && data.loginMember){
          setLoginMember(data.loginMember);
        }
    } );
  };
  
  useEffect(() => {
    fetchLoginMember();
  }, [loginMemberNo]);


  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setVacationDate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSignChange = (event) => {
    setSign(event.target.value);
  };

  const findNoByName = (name, companyMember) => {
    const member = companyMember.find(member => member.name === name);
    return member ? member.no : null;
  };

  // 기간 일수 (시작일, 종료일 포함)
  const days = vacationDate.startTime && vacationDate.finishTime
    ? Math.floor((new Date(vacationDate.finishTime) - new Date(vacationDate.startTime)) / 86400000) + 1
    : 0;

  const validate = () => {
    if (!selectApply.firstApply.no || !selectApply.midApply.no || !selectApply.lastApply.no) return '결재란의 승인자 3명을 모두 지정해주세요.';
    if (!vacationDate.startTime || !vacationDate.finishTime) return '기간을 입력해주세요.';
    if (days <= 0) return '종료일이 시작일보다 빠릅니다.';
    if (!content.trim()) return '세부사항을 입력해주세요.';
    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = validate();
    if (message) {
      alert(message);
      return;
    }

    const formData = {
      firstApplyNo: selectApply.firstApply.no,
      midApplyNo: selectApply.midApply.no,
      lastApplyNo: selectApply.lastApply.no,
      writerNo: loginMemberNo, 
      ...vacationDate,
      content,
      sign
    };
    console.log('formData:', formData);
    fetch("http://127.0.0.1:8888/app/api/business-trip-form/write" , {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then( resp => resp.json() )
    .then( data => {
      if(data.msg === 'good'){
        alert("결재 등록 완료");
        navigate('/document/list')
      } else {
        alert("결재 등록 실패")
      }
    } )
    .catch( error => {
      console.error('Error', error);
      alert('오류가 발생했습니다. 다시시도해주세요')
      console.log(formData);
    })
  };

    return (
        <>
            <DocSheet name="businessWriteForm" onSubmit={handleSubmit}>
                <DocHeader>
                    <div>
                        <h1>출장신청서</h1>
                        <div className="doc-meta">작성일 {today()}</div>
                    </div>
                    <ApprovalLine approvers={selectApply} onPick={handleOpenModal} />
                </DocHeader>

                <DocTable>
                    <div className="label">성명</div>
                    <div className="value">{loginMember.name}</div>
                    <div className="label">부서</div>
                    <div className="value">{loginMember.departName}</div>
                    <div className="label">직급</div>
                    <div className="value">{loginMember.positionName}</div>
                    <div className="label">회사</div>
                    <div className="value">{loginMember.companyName}</div>
                    <div className="label">기간</div>
                    <div className="value full">
                        <input type="date" name="startTime" value={vacationDate.startTime} onChange={handleDateChange} />
                        ~
                        <input type="date" name="finishTime" value={vacationDate.finishTime} onChange={handleDateChange} />
                        {days > 0 && <span className="doc-days">{days}일</span>}
                    </div>
                    <div className="label">세부사항</div>
                    <div className="value full tall">
                        <textarea value={content} onChange={handleContentChange} placeholder="출장지, 목적, 일정을 적어주세요." />
                    </div>
                </DocTable>

                <DocFooter>
                    <p>위와 같이 출장을 신청하오니 허락하여 주시기 바랍니다.</p>
                    <p className="date">{today()}</p>
                    <div className="sign">
                        신청자
                        <input type="text" value={sign} onChange={handleSignChange} placeholder={loginMember.name || '이름'} />
                        (인)
                    </div>
                </DocFooter>

                <DocActions>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/document/list')}>취소</button>
                    <button type="submit" className="btn btn-primary">결재 요청</button>
                </DocActions>
            </DocSheet>

            <ApproverPicker
                isOpen={isModalOpen}
                roleLabel={APPROVAL_ROLES.find(r => r.key === currentApplyType)?.label ?? '승인자'}
                members={companyMember}
                onSelect={handleSelectMember}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default BusinessTripFormWrite;
