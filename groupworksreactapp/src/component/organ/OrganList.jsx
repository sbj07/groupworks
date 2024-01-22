import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function groupByDepartNo(list) {
    return list.reduce((acc, vo) => {
        if (!acc[vo.departNo]) {
            acc[vo.departNo] = [];
        }
        acc[vo.departNo].push(vo);
        return acc;
    }, {});
}


const StyledOrganListDiv = styled.div`
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
    & > button {
        width: 30%;
        font-size: 2rem;
    }
`;


const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px; // 각 테이블 사이의 간격

    & th, & td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
    }

    & .depart-header {
        background-color: lightgray; // 헤더 배경색
        font-size: 1.2em; // 헤더 폰트 사이즈
    }
`;

const OrganList = () => {

    const navigate = useNavigate();

    const [organVoList, setOrganVoList] = useState([]);
    const loadOrganVoList = () => {
        fetch(`http://127.0.0.1:8888/app/organ/list`)
        .then(resp => resp.json())
        .then(data => {
            if (data.voList && Array.isArray(data.voList)) {
                setOrganVoList(data.voList);
            } else {
                console.error('Data is not an array:', data);
                setOrganVoList([]); // 데이터가 배열이 아닌 경우 빈 배열로 설정
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setOrganVoList([]); // 에러 발생 시 빈 배열로 설정
        });
    };
    useEffect( () => {
        // console.log("useEffect 호출");
        loadOrganVoList();
    }, [] );


    return (
        // <StyledOrganListDiv>
        //     <h1>조직도 목록 조회</h1>
        //     <table>
        //         <thead>
        //             <tr>dd부</tr>
        //             <tr>
        //                 <th>이름</th>
        //                 <th>부서</th>
        //                 <th>직책</th>
        //                 <th>전화번호</th>
        //                 <th>이메일</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {
        //                 Array.isArray(organVoList) && organVoList.length === 0
        //                 ?
        //                 <tr><td colSpan="7">로딩 중...</td></tr>
        //                 :
        //                 organVoList.map(vo => (
        //                     <tr key={vo.no}>
        //                         <td>{vo.name}</td>
        //                         <td>{vo.departNo}</td>
        //                         <td>{vo.positionNo}</td>
        //                         <td>{vo.tel}</td>
        //                         <td>{vo.email}</td>
        //                     </tr>
        //                 ))

        //             }
        //         </tbody>
        //     </table>
        // </StyledOrganListDiv>
        <StyledOrganListDiv>
        <h1>조직도 목록 조회</h1>
        {
                Array.isArray(organVoList) && organVoList.length === 0
                ?
                <div>로딩 중...</div>
                :
                Object.entries(groupByDepartNo(organVoList)).map(([departNo, list]) => (
                    <StyledTable key={departNo}>
                        <thead>
                            <tr className="depart-header">
                                <th colSpan="5">부서 번호: {departNo}</th>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <th>부서</th>
                                <th>직책</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(vo => (
                                <tr key={vo.no}>
                                    <td>{vo.name}</td>
                                    <td>{vo.departNo}</td>
                                    <td>{vo.positionNo}</td>
                                    <td>{vo.tel}</td>
                                    <td>{vo.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                ))
            }
    </StyledOrganListDiv>
    );
};

export default OrganList;