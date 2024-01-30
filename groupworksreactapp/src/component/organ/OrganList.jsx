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
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    // const [loginMemberVo, setLoginMemberVo] = useState([]);

    const [organVoList, setOrganVoList] = useState([]);
    const loadOrganVoList = () => {
        // const companyNo = 1;
        // fetch(`http://127.0.0.1:8888/app/organ/list?loginMemberNo=${loginMemberNo}`)
        // fetch(`http://127.0.0.1:8888/app/member/companyNo?loginMemberNo=${loginMemberNo}`)
        // .then(resp => resp.json())
        // .then(data => {
        //     setLoginMemberVo(data.loginMemberVo);
        //     console.log("데이터 갖고옴");
        //     console.log(data.voList);

        //     if (data.voList && Array.isArray(data.voList)) {
        //         setOrganVoList(data.voList);
        //     } else {
        //         console.error('Data is not an array:', data);
        //         setOrganVoList([]); // 데이터가 배열이 아닌 경우 빈 배열로 설정
        //     }
        // })
        // .catch(error => {
        //     console.error('Fetch error:', error);
        //     setOrganVoList([]); // 에러 발생 시 빈 배열로 설정
        // });
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


    // return (
    //     <StyledOrganListDiv>
    //     <h1>조직도 목록 조회</h1>
    //     <button onClick={handleOrganWrite}>조직도 작성</button>
    //          {
    //         Array.isArray(organVoList) && organVoList.length === 0
    //         ?
    //         <div>로딩 중...</div>
    //         :
    //         Object.entries(groupByDepartmentName(organVoList)).map(([departmentName, members]) => (
    //             <StyledTable key={departmentName}>
    //                 <thead>
    //                     <tr className="depart-header">
    //                         <th colSpan="5">부서 : {departmentName}</th>
    //                     </tr>
    //                     <tr>
    //                         <th>프로필</th>
    //                         <th>이름</th>
    //                         <th>직책</th>
    //                         <th>전화번호</th>
    //                         <th>이메일</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                 {members.map(member => (
    //                         <tr key={member.no} onClick={() => openModal(member)}>
    //                             <td>
    //                             {member.profile && <img src={`/path/to/your/images/${member.profile}`} alt="Profile" style={{ width: '50px', height: '50px' }}/>}
    //                                 </td>
    //                             <td>{member.name}</td>
    //                             <td>{member.positionName}</td>
    //                             <td>{member.tel}</td>
    //                             <td>{member.email}</td>
    //                         </tr>
    //                     ))}
    //                     {/* {members.map(member => (
    //                         <tr key={member.no}>
    //                             <td>{member.name}</td>
    //                             <td>{member.positionNo}</td>
    //                             <td>{member.tel}</td>
    //                             <td>{member.email}</td>
    //                         </tr>
    //                     ))} */}
    //                 </tbody>
    //             </StyledTable>
    //         ))
    //     }
    //         <OrganModal
    //             modalIsOpen={modalIsOpen}
    //             selectedVo={selectedVo}
    //             closeModal={closeModal}
    //             navigateToEdit={navigateToEdit}
    //             onDelete={handleDelete}
    //             organ={selectedVo}
    //         />
    // </StyledOrganListDiv>
    // );
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
                                <th colSpan="4">부서: {departName}</th>
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
