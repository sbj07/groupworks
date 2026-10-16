import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OrganModal from './OrganModal';
import SearchBox, { SearchField } from '../common/SearchBox';
import { API_BASE } from '../../api/config';

const EMPTY_SEARCH = { name: '', departName: '', positionName: '', tel: '' };

// 조회조건에 맞는 구성원만 남긴다 (조직도는 전체 목록을 한 번에 받으므로 화면에서 거른다)
const matchSearch = (member, search) => {
    const has = (value, keyword) => !keyword || (value ?? '').toLowerCase().includes(keyword.toLowerCase());
    return has(member.name, search.name)
        && (!search.departName || member.departName === search.departName)
        && (!search.positionName || member.positionName === search.positionName)
        && has(member.tel, search.tel);
};


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
    & > h1 {
        display: none; /* 제목은 상단바에 표시 */
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 16px;
    align-items: start;
`;

const Empty = styled.p`
    padding: 40px 0;
    margin: 0;
    color: var(--gw-text-muted);
    text-align: center;
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
    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState(EMPTY_SEARCH);
    const [appliedSearch, setAppliedSearch] = useState(EMPTY_SEARCH);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
    };
    const handleSearch = () => setAppliedSearch({ ...search });
    const handleSearchReset = () => {
        setSearch(EMPTY_SEARCH);
        setAppliedSearch(EMPTY_SEARCH);
    };

    const loadOrganVoList = () => {
        const loginMemberNo = sessionStorage.getItem("loginMemberNo");

        fetch(`${API_BASE}/organ/list?loginMemberNo=${loginMemberNo}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.voList && Array.isArray(data.voList)) {
                const filteredVoList = data.voList.filter(member => member.delYn !== 'Y');
                setOrganVoList(data.voList);
                setLoaded(true);
            } else {
                console.error('Data is not an array:', data);
                setOrganVoList([]);
                setLoaded(true);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setOrganVoList([]);
            setLoaded(true);
        });
    };

    useEffect(() => {
        loadOrganVoList();
    }, []);

    const handleDelete = no => {
        fetch(`${API_BASE}/organ/delete/${no}`, {
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

    const departOptions = [...new Set(organVoList.map(m => m.departName).filter(Boolean))];
    const positionOptions = [...new Set(organVoList.map(m => m.positionName).filter(Boolean))];
    const filteredList = organVoList.filter(member => matchSearch(member, appliedSearch));

    return (
        <StyledOrganListDiv>
            <h1>조직도</h1>
            <SearchBox onSearch={handleSearch} onReset={handleSearchReset}>
                <SearchField label="이름">
                    <input type="text" name="name" value={search.name} onChange={handleSearchChange} placeholder="이름" />
                </SearchField>
                <SearchField label="부서">
                    <select name="departName" value={search.departName} onChange={handleSearchChange}>
                        <option value="">전체</option>
                        {departOptions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </SearchField>
                <SearchField label="직책">
                    <select name="positionName" value={search.positionName} onChange={handleSearchChange}>
                        <option value="">전체</option>
                        {positionOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </SearchField>
                <SearchField label="전화번호">
                    <input type="text" name="tel" value={search.tel} onChange={handleSearchChange} placeholder="번호 일부" />
                </SearchField>
            </SearchBox>
            {
                !loaded
                ? <Empty>불러오는 중...</Empty>
                : filteredList.length === 0
                ? <Empty>조회조건에 맞는 구성원이 없습니다.</Empty>
                : <Grid>
                    {Object.entries(groupByDepartName(filteredList)).map(([departName, members]) => (
                    <StyledTable key={departName}>
                        <thead>
                            <tr className="depart-header">
                                <th colSpan="4"> {departName} <small>({members.length}명)</small></th>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <th>직책</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.no} onClick={() => openModal(member)}>
                                    <td>{member.name}</td>
                                    <td>{member.positionName}</td>
                                    <td>{member.tel}</td>
                                    <td>{member.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                    ))}
                  </Grid>
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
