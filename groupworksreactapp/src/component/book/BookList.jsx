import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookModal from './BookModal';
import SearchBox, { SearchField } from '../common/SearchBox';
import { API_BASE } from '../../api/config';

import { useNavigate } from 'react-router-dom';

const EMPTY_SEARCH = { startDate: '', endDate: '', memberName: '', bookPlace: '', bookPurpose: '' };

const StyledBookListDiv = styled.div`
    width: 100%;

    & > h1 {
        display: none; /* 제목은 상단바에 표시 */
    }
`;


const Button = styled.button`
    width: 10%; // 버튼 너비 조정
    background-color: rgba(135, 182, 229, 0.8); // 버튼 배경 투명도 조정
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); // 버튼 그림자 추가
    border-radius: 5px; // 버튼 둥근 모서리 추가
    padding: 10px 0; // 패딩 추가
    font-family: 'Open Sans', sans-serif; // 폰트 스타일 추가
    transition: background-color 0.2s ease-in-out; // 부드러운 색상 변경 효과

    &:hover {
        background-color: rgba(105, 152, 209, 0.9); // 호버 시 배경 색상 변경
    }
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: separate; // collapse에서 separate로 변경
    margin-bottom: 20px; // 각 테이블 사이의 간격
    border-spacing: 0; // 셀 사이의 간격 제거

    & th, & td {
        border-bottom: 1px solid var(--gw-border); // 아래쪽 테두리 추가
        padding: 8px;
        text-align: center;
    }

    & .depart-header {
        background-color: lightgray; // 헤더 배경색
        font-size: 1.2em; // 헤더 폰트 사이즈
        border-radius: 5px;
    }
`;

const BookList = () => {

    const [bookVoList, setBookVoList] = useState([]);
    const [search, setSearch] = useState(EMPTY_SEARCH);
    const [appliedSearch, setAppliedSearch] = useState(EMPTY_SEARCH);
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const loginMemberName = sessionStorage.getItem("loginMemberName");

    const loadBookVoList = async (condition) => {
        try {
            const params = new URLSearchParams();
            Object.entries(condition).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
            const response = await fetch(`${API_BASE}/book/list?${params}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.voList && Array.isArray(data.voList)) {
                setBookVoList(data.voList);
            } else {
                console.error('Data is not an array:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        loadBookVoList(appliedSearch);
    }, [appliedSearch]);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
    };

    const handleSearch = () => {
        if (search.startDate && search.endDate && search.startDate > search.endDate) {
            alert('시작일이 종료일보다 늦습니다.');
            return;
        }
        setAppliedSearch({ ...search });
    };

    const handleSearchReset = () => {
        setSearch(EMPTY_SEARCH);
        setAppliedSearch(EMPTY_SEARCH);
    };

    const handleBookWrite = () => {
        // setShowModal(!showModal);
        navigate('/book/insert');
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedVo, setSelectedVo] = useState(null);

    const openModal = (vo) => {
        setIsOpen(true);
        setSelectedVo(vo);
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedVo(null);
    }

    const navigateToEdit = () => {
        navigate(`/book/edit`, { state: { selectedVo } });
        closeModal();
    }

    // 목록을 새로 고치는 함수
    const refreshList = async () => {
        await loadBookVoList(appliedSearch);
    };

    return (
        <StyledBookListDiv>
            <h1>예약 조회</h1>
            {showModal && <BookModal closeModal={handleBookWrite} userName={loginMemberName}/>}
            <SearchBox
                onSearch={handleSearch}
                onReset={handleSearchReset}
                extra={<button type="button" className="btn btn-primary" onClick={handleBookWrite}>예약 신청</button>}
            >
                <SearchField label="사용 기간" span={2}>
                    <div className="range">
                        <input type="date" name="startDate" value={search.startDate} onChange={handleSearchChange} />
                        ~
                        <input type="date" name="endDate" value={search.endDate} onChange={handleSearchChange} />
                    </div>
                </SearchField>
                <SearchField label="예약자">
                    <input type="text" name="memberName" value={search.memberName} onChange={handleSearchChange} placeholder="이름" />
                </SearchField>
                <SearchField label="장소">
                    <input type="text" name="bookPlace" value={search.bookPlace} onChange={handleSearchChange} placeholder="회의실" />
                </SearchField>
                <SearchField label="사용 목적">
                    <input type="text" name="bookPurpose" value={search.bookPurpose} onChange={handleSearchChange} placeholder="키워드" />
                </SearchField>
            </SearchBox>
            <StyledTable>
                <thead>
                    <tr>
                        <th>예약 번호</th>
                        <th>예약자명</th>
                        <th>장소</th>
                        <th>언제부터</th>
                        <th>언제까지</th>
                        <th>사용 목적</th>
                        <th>예약시간</th>
                    </tr>
                </thead>
                <tbody>
                    { bookVoList.length > 0 ? (
                        bookVoList.map(book => (
                            <tr key={book.bookNo} onClick={() => openModal(book)}>
                                <td>{book.bookNo}</td>
                                <td>{book.memberName}</td>
                                <td>{book.bookPlace}</td>
                                <td>{book.startDate}</td>
                                <td>{book.endDate}</td>
                                <td>{book.bookPurpose}</td>
                                <td>{book.updateDate ? book.updateDate : book.bookDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">{loaded ? '조회조건에 맞는 예약이 없습니다.' : '불러오는 중...'}</td>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <BookModal
                modalIsOpen={modalIsOpen}
                selectedVo={selectedVo}
                closeModal={closeModal}
                navigateToEdit={navigateToEdit}
                refreshList={refreshList}
                book={selectedVo}
            />
        </StyledBookListDiv>
    );
};

export default BookList;
