import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    const [formList, SetFormList] = useState([]);
    const [applyList, setApplyList] = useState([]);
    const [isShowingApplyList, setIsShowingApplyList] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [applyCurrentPage, setApplyCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [applyTotalPages, setApplyTotalPages] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const limit = 10;
    const navigate = useNavigate();
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    
    const handleClick = () => {
        navigate('/document/write');
    };

    //내가올린거 조회
    useEffect( () => {
        fetch(`http://127.0.0.1:8888/app/api/vacation-form/list?writerNo=${loginMemberNo}&page=${currentPage}&limit=${limit}`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'good'){
                SetFormList(data.vacationVoList);
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

    const renderPagination = (currentPage, setCurrentPage, totalPages) => {
    return (
        <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전</button>
            <span>{currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>다음</button>
        </div>
        );
    };

    //여기서부터 추가
    const renderFormList = () => {
        return(
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>내용</th>
                        <th>결재상태</th>
                        <th>등록일시</th>
                        <th>결재일시</th>
                        <th>반려사유</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formList.length === 0
                        ?
                        <h1>로딩중...</h1>
                        :
                        formList.map( vo => <tr key = {vo.no}>
                            <td>{vo.no}</td>    
                            <td>{vo.content}</td>    
                            <td>{vo.categoryNo}</td>    
                            <td>{vo.writeDate}</td>
                            <td>{vo.documentDate}</td>
                            <td>{vo.rejection}</td>   
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
                        <th>내용</th>
                        <th>등록일시</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applyList.length === 0
                        ?
                        <h1>로딩중...</h1>
                        :
                        applyList.map( vo => <tr key = {vo.no}>
                            <td>{vo.no}</td>    
                            <td>{vo.content}</td>    
                            <td>{vo.writeDate}</td>
                        </tr> 
                        )
                    }
                </tbody>
            </table>
        );
    };
    ///

    // return (
    //     <StyledVacationFormListDiv>
    //         <h1>휴가신청서 목록</h1>
    //         <button onClick={handleClick}>휴가신청서 등록</button>
    //         <button onClick={handleApplyListClick}>승인대기목록</button>
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>번호</th>
    //                     <th>내용</th>
    //                     <th>결재상태</th>
    //                     <th>등록일시</th>
    //                     <th>결재일시</th>
    //                     <th>반려사유</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {
    //                     formList.length === 0
    //                     ?
    //                     <h1>로딩중...</h1>
    //                     :
    //                     formList.map( vo => <tr key = {vo.no}>
    //                         <td>{vo.no}</td>    
    //                         <td>{vo.content}</td>    
    //                         <td>{vo.categoryNo}</td>    
    //                         <td>{vo.writeDate}</td>
    //                         <td>{vo.documentDate}</td>
    //                         <td>{vo.rejection}</td>   
    //                     </tr> 
    //                     )
    //                 }  
    //             </tbody>
    //         </table>
    //         {renderPagination()}
    //     </StyledVacationFormListDiv>
    // );

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
        </StyledVacationFormListDiv>
    );
};

export default VacationFormList;