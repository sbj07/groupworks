import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';

const StyledVacationFormListDiv = styled.div`
    width: 100%;
    height: 120%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > table {
        width: 100%;
        height: 100%;
        border: 3px solid #282c34;
        text-align: center;
        border-collapse: collapse;
  }
`;


const VacationFormList = ({}) => {
    const [formList, setFormList] = useState([]);
    const [applyList, setApplyList] = useState([]);
    const [isShowingApplyList, setIsShowingApplyList] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [applyCurrentPage, setApplyCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
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
    
    const handleClick = () => {
        navigate('/document/write');
    };

    //내가올린거 조회
    useEffect( () => {
        fetch(`http://127.0.0.1:8888/app/api/vacation-form/list?writerNo=${loginMemberNo}&page=${currentPage}&limit=${limit}`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'good'){
                setFormList(data.vacationVoList);
                setTotalPages(data.pageInfo.maxPage);
            } else {
                console.log("목록 조회 실패");
            }
        } );
    } , [loginMemberNo, currentPage]);

    //승인자로 선택된 리스트 조회
    const loadApplyList = () => {
        fetch(`http://127.0.0.1:8888/app/api/vacation-form/apply-list?loginMemberNo=${loginMemberNo}&page=${applyCurrentPage}&limit=${limit}`)
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
        fetch(`http://127.0.0.1:8888/app/api/vacation-form/delete`, {
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

    const showMyVacationList = () => {
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
        // 선택된 휴가 신청서 번호 설정 로직 (필요하다면)
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
                backgroundColor: 'rgba(0, 0, 0, 0.75)' // 모달의 배경색을 어둡게 설정
                },
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
              }
            }}
          >
            <h2>반려 사유 입력</h2>
            <textarea 
              value={rejection}
              onChange={(e) => setRejection(e.target.value)}
            />
            <button onClick={handleRejectionClick}>반려</button>
            <button onClick={closeRejectionModal}>닫기</button>
          </Modal>
        );
      };

    const renderPagination = (currentPage, setCurrentPage, totalPages) => {
    return (
        <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전</button>
            <span>{currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>다음</button>
        </div>
        );
    };

    const renderDetailModal = () => {
        return (
            <Modal
                isOpen={isDetailModalOpen}
                onRequestClose={() => setIsDetailModalOpen(false)}
                contentLabel="결재 정보"
                style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.75)' // 모달의 배경색을 어둡게 설정
                      },
                    content: {
                      top: '50%',
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)'
                    }
                  }}
            >
                <h2>결재 정보</h2>
                <p>작성자: {loginMember?.name}</p>
                <p>부서: {loginMember?.departName}</p>
                <p>직급: {loginMember?.positionName}</p>
                <p>내용: {selectedItem?.content}</p>
                <p>시작일: {selectedItem?.startTime}</p>
                <p>종료일: {selectedItem?.finishTime}</p>
                <button onClick={() => setIsDetailModalOpen(false)}>닫기</button>
                
            </Modal>
        );
    };

    useEffect(() => {
        loadApplyList();
    }, [applyCurrentPage, triggerUpdate]); 


    const queryParam = encodeURIComponent(loginMemberNo);
    const url = `http://127.0.0.1:8888/app/api/vacation-form/login-member?no=${queryParam}`;
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
            fetch(`http://127.0.0.1:8888/app/api/vacation-form/apply`,{
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({no: vacationNo, loginMemberNo: loginMemberNo}),
            })
            .then( (resp) => resp.json() )
            .then( (data) => {
                if(data.msg === 'complete') {
                    alert("승인 처리 완료");
                } else if(data.msg === 'pending') {
                    alert("승인 성공! 최종 승인 대기중입니다.");
                } else {
                    alert("승인 처리 실패");
                }
                setTriggerUpdate(prev => !prev);
                loadApplyList();
                refreshFormList();
            } ) 
            .catch( (error) => {
                console.error('승인처리중 에러 발생' , error);
            } )
        }
    };

    const handleRejectionClick = () => {
        setIsRejectionModalOpen(true);
        const isConfirmed = window.confirm("정말 반려 하시겠습니까?");
        if(isConfirmed) {
            fetch(`http://127.0.0.1:8888/app/api/vacation-form/rejection`,{
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
        fetch(`http://127.0.0.1:8888/app/api/vacation-form/list?writerNo=${loginMemberNo}&page=${currentPage}&limit=${limit}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === 'good') {
                setFormList(data.vacationVoList);
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
                        <h1>등록한 결재 목록이 없습니다.</h1>
                        :
                        formList.map( vo => <tr key = {vo.no}>
                            <td >{vo.no}</td>    
                            <td>{vo.category}</td>    
                            <td>{vo.writeDate}</td>
                            <td>{vo.documentDate}</td>
                            <td>{vo.rejection}</td>  
                            <td>
                                <button onClick={() => handleDelete(vo.no)}>삭제</button>
                            </td> 
                        </tr> 
                        )
                    }
                </tbody>
            </table>
        );
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
                        <h1>등록한 결재 목록이 없습니다.</h1>
                        :
                        applyList.map( vo => <tr key = {vo.no}>
                            <td>{vo.no}</td>    
                            <td>{loginMember.name}</td>    
                            <td>{vo.writeDate}</td>
                            <td>
                                <button onClick={() => handleItemClick(vo)}>상세조회</button>
                            </td>
                            <td>
                                <button onClick={() => handleApplyClick(vo.no)}>승인</button>
                                <button onClick={() => handleRejectClick(vo.no)}>반려</button>
                            </td>
                        </tr> 
                        )
                    }
                </tbody>
            </table>
        );
    };
    
    return (
        <StyledVacationFormListDiv>
            <div>
                <button onClick={() => navigate('/document/write')}>휴가신청서 등록</button>
                <button onClick={showMyVacationList}>결재목록</button>
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
        </StyledVacationFormListDiv>
    );
};

export default VacationFormList;