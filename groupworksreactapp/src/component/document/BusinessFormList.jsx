import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { DocHeader, DocTable } from './ApprovalDoc';
import AppModal from '../common/AppModal';
import Pagination from '../common/Pagination';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { API_BASE } from '../../api/config';

const StyledBusinessTripFormListDiv = styled.div`
  width: 100%;

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 14px;
  }

  .tabs {
    display: inline-flex;
    gap: 4px;
    padding: 4px;
    border-radius: 10px;
    background: var(--gw-surface-2);
  }

  .tabs > button {
    padding: 7px 14px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--gw-text-muted);
    font-size: 13px;
    font-weight: 600;
  }

  .tabs > button.active {
    background: var(--gw-surface);
    color: var(--gw-primary);
    box-shadow: var(--gw-shadow-sm);
  }

  td .btn {
    padding: 4px 10px;
    font-size: 12px;
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
        fetch(`${API_BASE}/api/business-trip-form/list?writerNo=${loginMemberNo}&page=${currentPage}&limit=${limit}`)
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
        fetch(`${API_BASE}/api/business-trip-form/apply-list?loginMemberNo=${loginMemberNo}&page=${applyCurrentPage}&limit=${limit}`)
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
        fetch(`${API_BASE}/api/business-trip-form/delete`, {
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
          <AppModal
            isOpen={isRejectionModalOpen}
            onClose={closeRejectionModal}
            title="반려 사유 입력"
            subtitle="작성자에게 전달될 반려 사유를 적어주세요."
            footer={<>
                <button type="button" className="btn btn-outline-secondary" onClick={closeRejectionModal}>취소</button>
                <button type="button" className="btn btn-danger" onClick={handleRejectionClick} disabled={!rejection.trim()}>반려</button>
            </>}
          >
            <textarea
              className="form-control"
              rows={5}
              value={rejection}
              onChange={(e) => setRejection(e.target.value)}
              placeholder="예) 기간이 다른 일정과 겹칩니다."
            />
          </AppModal>
        );
      };

    const renderPagination = (page, setPage, totalPages) => (
        <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
    );

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
    const url = `${API_BASE}/api/business-trip-form/login-member?no=${queryParam}`;
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
            fetch(`${API_BASE}/api/business-trip-form/apply`,{
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
            fetch(`${API_BASE}/api/business-trip-form/rejection`,{
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
        fetch(`${API_BASE}/api/business-trip-form/list?writerNo=${loginMemberNo}&page=${currentPage}&limit=${limit}`)
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

    const statusTone = (category = '') =>
        category.includes('반려') ? 'danger' : category.includes('완료') || category.includes('승인') ? 'success' : 'primary';

    const renderFormList = () => {
        return(
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>결재상태</th>
                        <th>등록일</th>
                        <th>결재일</th>
                        <th>반려사유</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formList.length === 0
                        ? <tr><td colSpan="6"><EmptyState $compact>작성한 신청서가 없습니다.</EmptyState></td></tr>
                        : formList.map( vo => <tr key = {vo.no}>
                            <td>{vo.no}</td>
                            <td><Badge $tone={statusTone(vo.category)}>{vo.category}</Badge></td>
                            <td>{vo.writeDate}</td>
                            <td>{vo.documentDate || '-'}</td>
                            <td>{vo.rejection || '-'}</td>
                            <td>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => handleItemClick(vo)}>상세</button>{' '}
                                <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(vo.no)}>삭제</button>
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
                        <th>등록일</th>
                        <th>상세</th>
                        <th>결재처리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applyList.length === 0
                        ? <tr><td colSpan="4"><EmptyState $compact>승인을 기다리는 문서가 없습니다.</EmptyState></td></tr>
                        : applyList.map( vo => <tr key = {vo.no}>
                            <td>{vo.no}</td>
                            <td>{vo.writeDate}</td>
                            <td>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => handleItemClick(vo)}>상세보기</button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-success" onClick={() => handleApplyClick(vo.no)}>승인</button>{' '}
                                <button type="button" className="btn btn-outline-danger" onClick={() => handleRejectClick(vo.no)}>반려</button>
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
            <div className="toolbar">
                <div className="tabs">
                    <button type="button" className={`gw-reset ${!isShowingApplyList ? 'active' : ''}`} onClick={showMyBusinessList}>내 신청 문서</button>
                    <button type="button" className={`gw-reset ${isShowingApplyList ? 'active' : ''}`} onClick={loadApplyList}>승인 대기</button>
                </div>
                <button type="button" className="btn btn-primary" onClick={() => navigate('/document/businessWrite')}>출장신청서 작성</button>
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
