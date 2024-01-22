import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBusinessTripFormListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > table {
        width: 80%;
        height: 80%;
        border: 3px solid #282c34;
        text-align: center;
        border-collapse: collapse;
  }
`;

const BusinessTripFormList = ({}) => {
    const[formList, SetFormList] = useState([]);
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/document/businessWrite');
    };

    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    useEffect( () => {
        fetch(`http://127.0.0.1:8888/app/api/business-trip-form/list?writerNo=${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'good'){
                SetFormList(data.businessTripList);
            } else {
                console.log("목록 조회 실패");
            }
        } );
    } , [loginMemberNo] );
    return (
        <StyledBusinessTripFormListDiv>
            <h1>출장신청서 목록</h1>
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
            <button onClick={handleClick}>출장신청서 등록</button>
        </StyledBusinessTripFormListDiv>
    );
};

export default BusinessTripFormList;