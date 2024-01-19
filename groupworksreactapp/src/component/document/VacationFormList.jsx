import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const StyledVacationFormListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > table {
        width: 80%;
        height: 80%;
        border: 3px solid black;
  }
`;

const VacationFormList = () => {
    const[formList, SetFormList] = useState([]);
    const writerNo = 3;

    useEffect( () => {
        fetch(`http://127.0.0.1:8888/app/api/vacation-form/list?writerNo=${writerNo}`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'good'){
                SetFormList(data.vacationVoList);
            } else {
                console.log("목록 조회 실패");
            }
        } );
    } , [] );
    return (
        <StyledVacationFormListDiv>
            <h1>휴가신청서 목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>내용</th>
                        <th>작성일</th>
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
                            <td>{vo.writeDate}</td>    
                            <td>{vo.rejection}</td>   
                        </tr> 
                        )
                    }
                </tbody>
            </table>
        </StyledVacationFormListDiv>
    );
};

export default VacationFormList;