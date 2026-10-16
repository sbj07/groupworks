import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NoticeModal from './NoticeModal';
import { API_BASE } from '../../api/config';
import { api } from '../../api/http';
import SearchBox, { SearchField } from '../common/SearchBox';
import Pagination from '../common/Pagination';
import ListLayout from '../common/ListLayout';
import Badge from '../common/Badge';
import { notify } from '../common/Toast';

import {FaFileDownload} from 'react-icons/fa';

const EMPTY_SEARCH = { searchType: '', keyword: '', category: '', emergencyYn: '', startDate: '', endDate: '' };

const StyledTableHeader = styled.th`
    &.number {
        width: 10%; // 번호의 너비
    }
    &.title {
        width: 30%; // 제목의 너비
    }
    &.file {
        width: 10%; // 제목의 너비
    }
    &.writer {
        width: 20%; // 제목의 너비
    }
    &.emergency {
        width: 10%; // 제목의 너비
    }
    &.category {
        width: 20%; // 제목의 너비
    }
    &.open {
        width: 20%; // 제목의 너비
    }
    &.enrollDate {
        width: 30%; // 제목의 너비
    }
    &.clickNo {
        width: 10%; // 제목의 너비
    }
`;

const RightAlignedButton = styled.button`
    background-color: var(--gw-primary);
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    margin-left: auto; // 오른쪽 정렬
`;

const CompactList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    & > li {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px 4px;
        border-bottom: 1px solid var(--gw-border);
        cursor: pointer;
    }

    & > li:last-of-type {
        border-bottom: none;
    }

    & > li:hover .title {
        color: var(--gw-primary);
    }

    & .title {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
    }

    & small {
        flex-shrink: 0;
        color: var(--gw-text-muted);
    }

    & > li.empty {
        justify-content: center;
        padding: 24px 0;
        color: var(--gw-text-muted);
        cursor: default;
    }
`;

const StyledNoticeListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    /* margin-left: 15%; */
    color: #333; // 텍스트 색상 변경
    & > table {
        width: 100%;
        border-collapse: separate; // 테이블 테두리 분리
        border-spacing: 0 10px; // 셀 간격 조정
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // 테이블 그림자 추가
    }
    & > table th, td {
        border: none; // 테두리 제거
        padding: 8px; // 패딩 증가
        background-color: rgba(255, 255, 255, 0.8); // 셀 배경 투명도 조정
        border-radius: 8px; // 둥근 모서리 추가
        font-size: 14px;
    }
    & > table th {
        white-space: nowrap;
        background-color: var(--gw-primary); // 헤더 배경 투명도 조정
        color: white;
        font-size: 14px; // 글꼴 크기 변경
    }
    & > button {
        width: 10%; // 버튼 너비 조정
        background-color: var(--gw-primary); // 버튼 배경 투명도 조정
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 20px;
        border-radius: 8px; // 버튼 둥근 모서리 추가
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); // 버튼 그림자 추가
    }
    & > h1 {
        font-size: 28px; // 헤더 글꼴 크기 변경
        margin-bottom: 15px; // 여백 조정
        color: #333; // 헤더 색상 변경
    }
    & th:hover, & td:hover {
        background-color: var(--gw-row-hover); // 셀 호버 배경색 변경
    }

`;

// 조회수 증가
const incrementClickCount = async (noticeNo) => (await api.post(`/notice/increase-click/${noticeNo}`)).ok;

const NoticeList = ({ showTopFive, showWriteButton, showPagination, showEditAndDeleteProps }) => {
    const navigate = useNavigate();
    //
    const [showEditAndDelete, setShowEditAndDelete] = useState(showEditAndDeleteProps);
    //
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [noticeVoList, setNoticeVoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 항목 수
    const [totalItems, setTotalItems] = useState(0);
    const [loaded, setLoaded] = useState(false);
    // 조회조건: 입력 중인 값(search)과 실제 조회에 쓰는 값(appliedSearch)을 나눈다
    const [search, setSearch] = useState(EMPTY_SEARCH);
    const [appliedSearch, setAppliedSearch] = useState(EMPTY_SEARCH);
    const [categoryList, setCategoryList] = useState([]);
    const showSearch = showPagination;

    useEffect(() => {
        if (!showSearch) return;
        api.get('/notice/list/categoryList').then(data => setCategoryList(data.categories ?? []));
    }, [showSearch]);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
    };

    const handleSearch = () => {
        if (search.startDate && search.endDate && search.endDate < search.startDate) {
            notify('작성일 종료일이 시작일보다 빠를 수 없습니다.', 'error');
            return;
        }
        setCurrentPage(1);
        setAppliedSearch({ ...search });
    };

    const handleSearchReset = () => {
        setSearch(EMPTY_SEARCH);
        setCurrentPage(1);
        setAppliedSearch(EMPTY_SEARCH);
    };

    // const handleFileDownload = (filePath, e) => {
    //     e.stopPropagation(); // 상위 요소로의 이벤트 전파를 막음
    //     if (filePath) {
    //         const encodedPath = encodeURI(filePath);
    //         window.open(filePath);
    //     }
    // };
    const handleFileDownload = (filePath, e) => {
        e.stopPropagation(); // 상위 요소로의 이벤트 전파를 막음
    
        // 파일 이름만 추출
        const fileName = filePath.split('/').pop();
        // 서버에서 설정된 정적 파일 경로를 사용
        const downloadURL = `${API_BASE}${filePath}`;
    
        // a 태그를 생성하여 프로그래매틱하게 클릭 이벤트를 발생시킵니다.
        const link = document.createElement('a');
        link.href = downloadURL;
        link.setAttribute('download', fileName); // 다운로드되는 파일의 이름을 지정
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleCloseModal = () => {
        setSelectedNotice(null);
    };

    // 공지 목록 (홈에서는 최근 5개만)
    const loadNoticeVoList = useCallback(async () => {
        const params = new URLSearchParams({ page: currentPage, limit: itemsPerPage });
        Object.entries(appliedSearch).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        const data = await api.get(`/notice/list?${params}`);
        const list = data.ok && Array.isArray(data.voList) ? data.voList : [];
        setTotalItems(data.totalCount ?? 0);
        setNoticeVoList(showTopFive ? list.slice(0, 5) : list);
        setLoaded(true);
    }, [currentPage, appliedSearch, showTopFive]);


    const handleNoticeClick = async (notice) => {
        const success = await incrementClickCount(notice.noticeNo);
    
        if (success) {
            await loadNoticeVoList();
            const found = noticeVoList.find(n => n.noticeNo === notice.noticeNo) ?? notice;
            const updatedNotice = { ...found, clickNo: Number(found.clickNo ?? 0) + 1 };

            //
            const loginMemberNo = sessionStorage.getItem("loginMemberNo");
            const canEditDelete = notice.memberNo === loginMemberNo;
            //

            setSelectedNotice(updatedNotice);
            //
            setShowEditAndDelete(canEditDelete);
            //
        } else {
            setSelectedNotice(notice);
        }
    };

    const handleDelete = async (noticeNo) => {
        const result = await api.delete(`/notice/delete/${noticeNo}`);
        if (result.ok) {
            notify(result.message, 'success');
            handleCloseModal();
            loadNoticeVoList();
        }
    };

    useEffect(() => { loadNoticeVoList(); }, [loadNoticeVoList]);

    const renderPagination = () => {
        if (!showPagination) {
            return null; // 페이징을 표시하지 않음
        }
        
        const maxPage = Math.max(1, Math.ceil(totalItems / itemsPerPage));

        return <Pagination currentPage={currentPage} totalPages={maxPage} onChange={setCurrentPage} />;
    };

    // 홈 화면용 짧은 목록: 제목, 작성자, 날짜만
    if (showTopFive) {
        return (
            <CompactList>
                {noticeVoList.length === 0
                    ? <li className="empty">{loaded ? '등록된 공지사항이 없습니다.' : '불러오는 중...'}</li>
                    : noticeVoList.map(notice => (
                        <li key={notice.noticeNo} onClick={() => handleNoticeClick(notice)}>
                            {notice.emergencyYn === 'Y' && <Badge $tone="danger">긴급</Badge>}
                            <span className="title">{notice.title}</span>
                            <small>{notice.memberName}</small>
                            <small>{(notice.updateDate || notice.enrollDate || '').slice(0, 10)}</small>
                        </li>
                    ))}
                {selectedNotice && (
                    <NoticeModal notice={selectedNotice} onClose={handleCloseModal} onDelete={handleDelete} showEditAndDelete={showEditAndDelete} />
                )}
            </CompactList>
        );
    }

    return (
        <ListLayout
            footer={renderPagination()}
            search={showSearch && (
                <SearchBox
                    onSearch={handleSearch}
                    onReset={handleSearchReset}
                    extra={showWriteButton && <button type="button" className="btn btn-primary" onClick={() => navigate("/notice/insert")}>작성하기</button>}
                >
                    <SearchField label="검색어" span={2}>
                        <div className="combo">
                            <select name="searchType" value={search.searchType} onChange={handleSearchChange}>
                                <option value="">제목+내용</option>
                                <option value="title">제목</option>
                                <option value="content">내용</option>
                                <option value="writer">작성자</option>
                            </select>
                            <input type="text" name="keyword" value={search.keyword} onChange={handleSearchChange} placeholder="검색어를 입력하세요" />
                        </div>
                    </SearchField>
                    <SearchField label="카테고리">
                        <select name="category" value={search.category} onChange={handleSearchChange}>
                            <option value="">전체</option>
                            {categoryList.map(c => <option key={c.categoryNo} value={c.categoryNo}>{c.categoryCon}</option>)}
                        </select>
                    </SearchField>
                    <SearchField label="긴급여부">
                        <select name="emergencyYn" value={search.emergencyYn} onChange={handleSearchChange}>
                            <option value="">전체</option>
                            <option value="Y">긴급</option>
                            <option value="N">일반</option>
                        </select>
                    </SearchField>
                    <SearchField label="작성일" span={2}>
                        <div className="range">
                            <input type="date" name="startDate" value={search.startDate} onChange={handleSearchChange} />
                            ~
                            <input type="date" name="endDate" value={search.endDate} onChange={handleSearchChange} />
                        </div>
                    </SearchField>
                </SearchBox>
            )}
        >
        <StyledNoticeListDiv>
            {!showSearch && showWriteButton && <RightAlignedButton onClick={() => navigate("/notice/insert")}>작성하기</RightAlignedButton>}
            
            <table>
                <thead>
                    <tr>
                        <StyledTableHeader className='number'>번호</StyledTableHeader>
                        <StyledTableHeader className='title'>제목</StyledTableHeader>
                        <StyledTableHeader className='file'>파일</StyledTableHeader>
                        <StyledTableHeader className='writer'>작성자</StyledTableHeader>
                        <StyledTableHeader className='emergency'>긴급여부</StyledTableHeader>
                        <StyledTableHeader className='category'>카테고리</StyledTableHeader>
                        <StyledTableHeader className='open'>공개부서</StyledTableHeader>
                        <StyledTableHeader className='enrollDate'>작성일자</StyledTableHeader>
                        <StyledTableHeader className='clickNo'>조회수</StyledTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {
                        noticeVoList.length===0
                        ?
                        <tr><td colSpan="9">{loaded ? '조회된 공지사항이 없습니다.' : '불러오는 중...'}</td></tr>
                        :
                        noticeVoList.map( notice => (
                            // notice.deleteYn === 'y' ? null : (
                            <tr key={notice.noticeNo} onClick={() => handleNoticeClick(notice)}>
                            <td>{notice.noticeNo}</td>
                            <td>{notice.title}</td>
                            <td>
                                {notice.filePath && (
                                        <FaFileDownload 
                                            onClick={(e) => handleFileDownload(notice.filePath, e)}
                                            // onClick={(e) => handleFileDownload(notice.filePath.split('/').pop(), e)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                )}
                            </td>
                            <td>{notice.memberName}</td>
                            <td>{notice.emergencyYn === 'Y' ? <Badge $tone="danger">긴급</Badge> : <Badge>일반</Badge>}</td>
                            <td>{notice.categoryCon}</td>
                            <td>{notice.departName}</td>
                            <td>{notice.updateDate ? `(${notice.updateDate})` : notice.enrollDate}</td>
                            <td>{notice.clickNo}</td>
                        </tr>
                            ))
                            // )
                    }
                </tbody>
            </table>
            {selectedNotice && (
                <NoticeModal 
                notice={selectedNotice} 
                onClose={handleCloseModal} 
                
                onDelete={handleDelete}
                showEditAndDelete={showEditAndDelete}
                />
                )}
            
        </StyledNoticeListDiv>
        </ListLayout>
    );
};

export default NoticeList;