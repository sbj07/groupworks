import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OrganModal from './OrganModal';


function groupByDepartName(list) {

    return list.reduce((acc, member) => {
        // 여기서 member.departName은 부서 이름을 나타냅니다. 실제 필드명에 맞게 조정해야 합니다.
        const departName = member.departName;

        if (!acc[departName]) {
            acc[departName] = [];
        }
        acc[departName].push(member);
        return acc;
    }, {});
}


const StyledOrganListDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 16px;
    align-items: start;

    & > h1 {
        display: none; /* 제목은 상단바에 표시 */
    }
`;

const StyledTable = styled.table`
    width: 100%;
    margin: 0;
    border: 1px solid var(--gw-border);
    border-radius: var(--gw-radius);
    overflow: hidden;
    border-collapse: separate !important;

    & .depart-header th {
        background: var(--gw-surface) !important;
        color: var(--gw-text) !important;
        font-size: 15px !important;
        font-weight: 700;
        text-align: left;
        padding: 14px 16px !important;
    }

    & td {
        text-align: center;
    }

    & tbody tr {
        cursor: pointer;
    }
`;

const OrganList = () => {

    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const navigate = useNavigate();
    // const [loginMemberVo, setLoginMemberVo] = useState([]);

    const [organVoList, setOrganVoList] = useState([]);

    const loadOrganVoList = () => {
        const loginMemberNo = sessionStorage.getItem("loginMemberNo");

        console.log(loginMemberNo);
        fetch(`http://127.0.0.1:8888/app/organ/list?loginMemberNo=${loginMemberNo}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.voList && Array.isArray(data.voList)) {
                const filteredVoList = data.voList.filter(member => member.delYn !== 'Y');
                setOrganVoList(data.voList);
            } else {
                console.error('Data is not an array:', data);
                setOrganVoList([]); 
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setOrganVoList([]); 
        });
    };

    useEffect(() => {
        loadOrganVoList();
    }, []);

    const handleDelete = no => {
        fetch(`http://127.0.0.1:8888/app/organ/delete/${no}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then(response => {
            if(!response.ok){
                throw new Error('서버 오류 발생')
            }
            return response.text();
        })
        .then(data => {
            console.log('삭제 성공:' , data);
            alert("조직도 삭제 성공");
            loadOrganVoList();
        })
        .catch(error => {
            console.error('삭제 실패 : ', error);
            alert("조직도 삭제 실패")
        });
    };


    useEffect( () => {
        // console.log("useEffect 호출");
        loadOrganVoList();
    }, [] );

    const handleOrganWrite = () => {
        navigate('/organ/insert');
    }


    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedVo, setSelectedVo] = useState(null);

    // const openModal = (vo) => {
    //     setIsOpen(true);
    //     setSelectedVo(vo);
    // }
    const openModal = (member) => {
        setIsOpen(true);
        setSelectedVo(member);
    }
    

    const closeModal = () => {
        setIsOpen(false);
        setSelectedVo(null);
    }

    const navigateToEdit = () => {
        navigate(`/organ/edit`, { state: { selectedVo } });
        closeModal();
    }

    return (
        <StyledOrganListDiv>
            <h1>조직도</h1>
            {/* <button onClick={handleOrganWrite}>조직도 작성</button> */}
            {
                Array.isArray(organVoList) && organVoList.length === 0
                ? <div>로딩 중...</div>
                : Object.entries(groupByDepartName(organVoList)).map(([departName, members]) => (
                    <StyledTable key={departName}>
                        <thead>
                            <tr className="depart-header">
                                <th colSpan="4"> {departName}</th>
                            </tr>
                            <tr>
                                {/* <th>프로필</th> */}
                                <th>이름</th>
                                <th>직책</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.no} onClick={() => openModal(member)}>
                                    {/* <td>{member.profile && <img src={`/path/to/your/images/${member.profile}`} alt="Profile" style={{ width: '50px', height: '50px' }}/>}</td> */}
                                    <td>{member.name}</td>
                                    <td>{member.positionName}</td> {/* 직책 필드명 확인 필요 */}
                                    <td>{member.tel}</td>
                                    <td>{member.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                ))
            }
            <OrganModal
                modalIsOpen={modalIsOpen}
                selectedVo={selectedVo}
                closeModal={closeModal}
                navigateToEdit={navigateToEdit}
                onDelete={handleDelete}
                organ={selectedVo}
            />
        </StyledOrganListDiv>
    );

};

export default OrganList;
