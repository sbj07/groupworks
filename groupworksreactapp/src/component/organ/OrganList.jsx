import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
        <StyledOrganListDiv>
            <h1>조직도 목록 조회</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>멤버번호</th>
                        <th>프사</th>
                        <th>부서</th>
                        <th>직책</th>
                        <th>이름</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(organVoList) && organVoList.length === 0
                        ?
                        <tr><td colSpan="7">로딩 중...</td></tr>
                        :
                        organVoList.map(vo => (
                            <tr key={vo.orgNo}>
                                <td>{vo.orgNo}</td>
                                <td>{vo.memberNo}</td>
                                <td>{vo.profile}</td>
                                <td>{vo.department}</td>
                                <td>{vo.position}</td>
                                <td>{vo.name}</td>
                                <td>{vo.tel}</td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
        </StyledOrganListDiv>
    );
};

export default OrganList;