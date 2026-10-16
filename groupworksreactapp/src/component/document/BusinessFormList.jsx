import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { DocHeader, DocTable } from './ApprovalDoc';

const StyledBusinessTripFormListDiv = styled.div`
  width: 100%;
  height: 120%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;

  table {
    width: 80%; // 테이블의 너비를 조정
    border-collapse: separate; // 테이블 사이의 간격 없애기
    border-spacing: 0 10px;
    margin: 20px 0; // 테이블 상하 여백 추가
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 테이블에 그림자 효과 추가

    th, td {
      border: none;
      padding: 15px; // 셀 패딩 조정
      border: 1px solid var(--gw-border); // 셀 경계선 색상 조정
      text-align: center; // 텍스트 왼쪽 정렬
      border-radius: 8px;
    }
    
    th {
      border: none;
      min-width: 160px;
      background-color: var(--gw-primary); // 테이블 헤더 배경색 조정
      color: white; // 테이블 헤더 글자색 조정
    }

    td {
        border: none;
    }

    tr:nth-child(odd) {
      background-color: var(--gw-surface-2); // 홀수 줄 배경색 조정
    }

    tr:hover {
      background-color: var(--gw-row-hover); // 마우스 오버 시 배경색 변경
    }

    button {
      padding: 8px 16px; // 버튼 패딩 조정
      border: none;
      border-radius: 8px; // 버튼 모서리 둥글게 조정
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s; // 배경색 변경 애니메이션 추가
      background-color: var(--gw-primary); // 버튼 배경색 변경

      &:hover {
        background-color: var(--gw-primary); // 호버 시 버튼 배경색 변경
      }
    }
  }
`;

const BusinessTripFormList = ({}) => {
    const [formList, setFormList] = useState([]);
    const [applyList, setApplyList] = useState([]);
    const [isShowingApplyList, setIsShowingApplyList] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [applyCurrentPage, setApplyCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [applyTotalPages, setApplyTotalPages] = useState(0);
    const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
    const [rejection, setRejection] = useState('');
    const [selectedVacationNo, setSelectedVacationNo] = useState(null);
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const limit = 10;
    const navigate = useNavigate();
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [loginMember, setLoginMember] = useState([]);
    
    // 미사용 함수
    const handleClick = () => {
        navigate('/document/businessWrite');
    };

    useEffect( () => {
        fetch(`http://127.0.0.1:8888/app/api/business-trip-form/list?writerNo=${loginMemberNo}&page=${currentPage}&limit=${limit}`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'good'){
                setFormList(data.businessTripList);
                setTotalPages(data.pageInfo.maxPage);
            } else {
                console.log("목록 조회 실패");
            }
        } );
    } , [loginMemberNo, currentPage] );

    const loadApplyList = () => {
        fetch(`http://127.0.0.1:8888/app/api/business-trip-form/apply-list?loginMemberNo=${loginMemberNo}&page=${applyCurrentPage}&limit=${limit}`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'good'){
                setApplyList(data.applyVoList);
                setApplyTotalPages(data.pageInfo.maxPage);
                setIsShowingApplyList(true);
            } else{
                console.log("목록 조회 실패");
            }
        })
    };

    const handleDelete =(vacationNo) => {
        fetch(`http://127.0.0.1:8888/app/api/business-trip-form/delete`, {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({no: vacationNo, writerNo: loginMemberNo}),
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            if(data.msg === 'good'){
                alert('목록 삭제 완료');
                setFormList(formList.filter(item => item.no !== vacationNo));
                setApplyList(applyList.filter(item => item.no !== vacationNo));
            }else{
                alert("목록 삭제 실패");
            }
        } );
    };
  
    const showMyBusinessList = () => {
        setIsShowingApplyList(false);
    };

    const handleApplyListClick = () => {
        loadApplyList();
    }

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleApplyPreviousPage = () => {
        setApplyCurrentPage(applyCurrentPage - 1);
    };

    const handleApplyNextPage = () => {
        setApplyCurrentPage(applyCurrentPage + 1);
    };

    const handleRejectClick = (vacationNo) => {
        setSelectedVacationNo(vacationNo);
        setIsRejectionModalOpen(true);
    };
    const closeRejectionModal = () => {
    setIsRejectionModalOpen(false);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsDetailModalOpen(true);
    };

    const renderRejectionModal = () => {
        return (
          <Modal 
            isOpen={isRejectionModalOpen}
            onRequestClose={closeRejectionModal}
            contentLabel="반려 사유 입력"
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                },
                content: {
                  position: 'relative',
                  inset: 'auto',
                  margin: 'auto',
                  border: '1px solid #ccc',
                  background: '#fff',
                  overflow: 'auto',
                  borderRadius: '10px',
                  outline: 'none',
                  padding: '40px',
                  width: '40%',
                  minWidth: '300px',
                  maxHeight: 'calc(100% - 40px)', // 화면의 높이에서 40px 뺀 만큼
                }
              }}
          >
            <h2>반려 사유 입력</h2>
            <textarea 
              value={rejection}
              onChange={(e) => setRejection(e.target.value)}
              style={{
                width: '100%',
                height: '150px',
                marginBottom: '20px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
            <button onClick={handleRejectionClick}
            style={{
                padding: '10px 20px',
                marginRight: '10px',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'var(--gw-warning)',
                color: 'white'
            }}>반려</button>
            <button onClick={closeRejectionModal}
            style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: '#9e9e9e',
                color: 'white'
            }}>닫기</button>
          </Modal>
        );
      };
    
    const renderPagination = (currentPage, setCurrentPage, totalPages) => {
    return (
        <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전</button>
            <span>{currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages}>다음</button>
        </div>
        );
    };

    const renderDetailModal = () => {
        return (
            <Modal
                isOpen={isDetailModalOpen}
                onRequestClose={() => setIsDetailModalOpen(false)}
                contentLabel="결재 문서"
                style={{
                    overlay: { backgroundColor: 'rgba(15, 23, 42, 0.45)', zIndex: 100 },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        width: 'min(720px, calc(100vw - 32px))',
                        maxHeight: 'calc(100vh - 40px)',
                        padding: '32px',
                        overflow: 'auto',
                    },
                }}
            >
                <DocHeader>
                    <div>
                        <h1>출장신청서</h1>
                        <div className="doc-meta">문서번호 {selectedItem?.no} · 작성일 {selectedItem?.writeDate}</div>
                    </div>
                </DocHeader>
                <DocTable>
                    <div className="label">작성자</div>
                    <div className="value">{loginMember?.name}</div>
                    <div className="label">부서 / 직급</div>
                    <div className="value">{[loginMember?.departName, loginMember?.positionName].filter(Boolean).join(' / ')}</div>
                    <div className="label">기간</div>
                    <div className="value">{selectedItem?.startTime} ~ {selectedItem?.finishTime}</div>
                    <div className="label">문서 종류</div>
                    <div className="value">{selectedItem?.category ?? '출장신청서'}</div>
                    <div className="label">세부사항</div>
                    <div className="value full" style={{ whiteSpace: 'pre-wrap', alignItems: 'flex-start', minHeight: '160px' }}>{selectedItem?.content}</div>
                    {selectedItem?.rejection && <>
                        <div className="label">반려 사유</div>
                        <div className="value full" style={{ color: 'var(--gw-danger)' }}>{selectedItem.rejection}</div>
                    </>}
                </DocTable>
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setIsDetailModalOpen(false)}>닫기</button>
                </div>
            </Modal>
        );
    };

    useEffect(() => {
        loadApplyList();
    }, [applyCurrentPage, triggerUpdate]); 


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
    
    const handleApplyClick = (vacationNo) => {
        const isConfirmed = window.confirm("정말 승인 하시겠습니까?");
        if(isConfirmed) {
            fetch(`http://127.0.0.1:8888/app/api/business-trip-form/apply`,{
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({no: vacationNo, loginMemberNo: loginMemberNo}),
            })
            .then( (resp) => resp.json() )
            .then( (data) => {
                if(data.msg === 'good'){
                    alert("최종 승인처리 완료")
                    setTriggerUpdate(prev => !prev);
                    loadApplyList();
                    refreshFormList();
                    setApplyList(applyList.filter(item => item.no !== vacationNo));
                }else{
                    alert("승인처리 완료. 최종 승인 대기중");
                    setApplyList(applyList.filter(item => item.no !== vacationNo));
                }
            } ) 
            .catch( (error) => {
                console.error('승인처리중 에러 발생' , error);
            } )
        }
    };

    const handleRejectionClick = () => {
        const isConfirmed = window.confirm("정말 반려 하시겠습니까?");
        if(isConfirmed) {
            fetch(`http://127.0.0.1:8888/app/api/business-trip-form/rejection`,{
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    no: selectedVacationNo, 
                    loginMemberNo: loginMemberNo,
                    rejection: rejection
                }),
            })
            .then( (resp) => resp.json() )
            .then( (data) => {
                if(data.msg === 'good'){
                    alert("반려처리 완료")
                    closeRejectionModal();
                    setTriggerUpdate(prev => !prev);
                    loadApplyList();
                    refreshFormList();
                }else{
                    alert("반려처리 실패")
                }
            } ) 
            .catch( (error) => {
                console.error('반려처리중 에러 발생' , error);
            } )
        }
    };

    const refreshFormList = () => {
        fetch(`http://127.0.0.1:8888/app/api/business-trip-form/list?writerNo=${loginMemberNo}&page=${currentPage}&limit=${limit}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === 'good') {
                setFormList(data.businessTripList);
            } else {
                console.log("목록 조회 실패");
            }
        })
        .catch(error => console.error('목록 조회 중 에러 발생', error));
    };

    const renderFormList = () => {
        return(
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>결재상태</th>
                        <th>등록일시</th>
                        <th>결재일시</th>
                        <th>반려사유</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formList.length === 0
                        ?
                        <h3>Loading</h3>
                        :
                        formList.map( vo => <tr key = {vo.no}>
                            <td>{vo.no}</td>    
                            <td>{vo.category}</td>    
                            <td>{vo.writeDate}</td>
                            <td>{vo.documentDate}</td>
                            <td>{vo.rejection}</td>   
                            <td>
                                <button onClick={() => handleDelete(vo.no)}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '1rem',
                                    borderRadius: '5px',
                                    border: 'none',
                                    color: 'white',
                                    background: 'var(--gw-danger)', 
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out'
                                }}>삭제</button>
                            </td>
                        </tr> 
                        )
                    }
                </tbody>
            </table>
        )
    };

    const renderApplyList = () => {
        return(
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>작성자</th>
                        <th>등록일시</th>
                        <th>상세조회</th>
                        <th>결재처리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applyList.length === 0
                        ?
                        <h3>Loading</h3>
                        :
                        applyList.map( vo => <tr key = {vo.no}>
                            <td>{vo.no}</td>    
                            <td>{loginMember.name}</td>    
                            <td>{vo.writeDate}</td>
                            <td>
                                <button onClick={() => handleItemClick(vo)}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '1rem',
                                    borderRadius: '5px',
                                    border: 'none',
                                    color: 'white',
                                    background: '#999', // 승인 버튼을 초록색으로 설정
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out'
                                  }}>상세조회</button>
                            </td>
                            <td>
                                <button onClick={() => handleApplyClick(vo.no)}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '1rem',
                                    borderRadius: '5px',
                                    border: 'none',
                                    color: 'white',
                                    background: 'var(--gw-success)', // 승인 버튼을 초록색으로 설정
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out'
                                  }}>승인</button>
                                <button onClick={() => handleRejectClick(vo.no)}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '1rem',
                                    borderRadius: '5px',
                                    border: 'none',
                                    color: 'white',
                                    background: 'var(--gw-warning)', // 반려 버튼을 진한 노란색으로 설정
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out'
                                  }}>반려</button>
                            </td>
                        </tr> 
                        )
                    }
                </tbody>
            </table>
        );
    };

    return (
        <StyledBusinessTripFormListDiv>
            <div>
                <button onClick={() => navigate('/document/businessWrite')}>출장신청서 등록</button>
                <button onClick={showMyBusinessList}>결재목록</button>
                <button onClick={loadApplyList}>승인대기목록</button>
            </div>


            {isShowingApplyList ? (
                <>
                    {renderApplyList()}
                    {renderPagination(applyCurrentPage, setApplyCurrentPage, applyTotalPages)}
                </>
            ) : (
                <>
                    {renderFormList()}
                    {renderPagination(currentPage, setCurrentPage, totalPages)}
                </>
            )}
           {renderRejectionModal()}
           {renderDetailModal()}
        </StyledBusinessTripFormListDiv>
    );
};

export default BusinessTripFormList;