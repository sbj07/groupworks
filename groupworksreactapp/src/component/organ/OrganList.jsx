import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrganModal from './OrganModal';
import SearchBox, { SearchField } from '../common/SearchBox';
import ListLayout from '../common/ListLayout';
import Badge from '../common/Badge';
import { api } from '../../api/http';
import { WORK_STATUS_TONE } from '../attendance/WorkStatus';

const EMPTY_SEARCH = { name: '', departName: '', positionName: '', tel: '' };

// 조회조건에 맞는 구성원만 남긴다 (조직도는 전체 목록을 한 번에 받으므로 화면에서 거른다)
const matchSearch = (member, search) => {
    const has = (value, keyword) => !keyword || (value ?? '').toLowerCase().includes(keyword.toLowerCase());
    return has(member.name, search.name)
        && (!search.departName || member.departName === search.departName)
        && (!search.positionName || member.positionName === search.positionName)
        && has(member.tel, search.tel);
};

// 부서별로 묶기
const groupByDepartName = (list) => list.reduce((acc, member) => {
    const departName = member.departName || "부서 없음";
    (acc[departName] = acc[departName] || []).push(member);
    return acc;
}, {});


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
    const [organVoList, setOrganVoList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState(EMPTY_SEARCH);
    const [appliedSearch, setAppliedSearch] = useState(EMPTY_SEARCH);
    const [selectedVo, setSelectedVo] = useState(null);

    useEffect(() => {
        api.get('/organ/list').then(result => {
            setOrganVoList(result.ok ? result.voList ?? [] : []);
            setLoaded(true);
        });
    }, []);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
    };
    const handleSearch = () => setAppliedSearch({ ...search });
    const handleSearchReset = () => {
        setSearch(EMPTY_SEARCH);
        setAppliedSearch(EMPTY_SEARCH);
    };

    const departOptions = [...new Set(organVoList.map(m => m.departName).filter(Boolean))];
    const positionOptions = [...new Set(organVoList.map(m => m.positionName).filter(Boolean))];
    const filteredList = organVoList.filter(member => matchSearch(member, appliedSearch));

    return (
        <ListLayout search={
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
        }>
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
                                <th colSpan="4">{departName} <small>({members.length}명)</small></th>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <th>직책</th>
                                <th>근무 상태</th>
                                <th>전화번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.no} onClick={() => setSelectedVo(member)}>
                                    <td>{member.name}</td>
                                    <td>{member.positionName}</td>
                                    <td>{member.workStatusName ? <Badge $tone={WORK_STATUS_TONE[member.workStatusNo]}>{member.workStatusName}</Badge> : '-'}</td>
                                    <td>{member.tel}</td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                    ))}
                  </Grid>
            }
            <OrganModal selectedVo={selectedVo} closeModal={() => setSelectedVo(null)} />
        </ListLayout>
    );
};

export default OrganList;
