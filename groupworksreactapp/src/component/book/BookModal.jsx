import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppModal from '../common/AppModal';
import InfoList from '../common/InfoList';
import { API_BASE } from '../../api/config';

const BookModal = ({ modalIsOpen, selectedVo, closeModal, refreshList }) => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const navigate = useNavigate();

    const navigateToEdit = () => {
        navigate(`/book/edit`, { state: { selectedVo } });
        closeModal();
    };

    const navigateToDelete = async () => {
        if (window.confirm('예약을 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`${API_BASE}/book/delete/${selectedVo.bookNo}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('서버 오류 발생');
                }

                alert('예약이 삭제되었습니다.');
                closeModal();
                if (refreshList) {
                    refreshList(); // 부모 컴포넌트에서 목록을 새로 고치는 함수
                }

            } catch (error) {
                console.error('삭제 실패:', error);
                alert('예약 삭제 실패');
            }
        }
    };

    const isMine = selectedVo?.memberNo === loginMemberNo;

    return (
        <AppModal
            isOpen={modalIsOpen && !!selectedVo}
            onClose={closeModal}
            title="예약 상세"
            subtitle={selectedVo && `예약 번호 ${selectedVo.bookNo}`}
            width={460}
            footer={<>
                {isMine && (
                    <>
                        <button type="button" className="btn btn-outline-danger" onClick={navigateToDelete}>삭제</button>
                        <button type="button" className="btn btn-outline-primary" onClick={navigateToEdit}>수정</button>
                    </>
                )}
                <button type="button" className="btn btn-primary" onClick={closeModal}>닫기</button>
            </>}
        >
            {selectedVo && (
                <InfoList items={[
                    { label: '예약자', value: selectedVo.memberName },
                    { label: '장소', value: selectedVo.bookPlace },
                    { label: '사용 시간', value: `${selectedVo.startDate} ~ ${selectedVo.endDate}` },
                    { label: '사용 목적', value: selectedVo.bookPurpose },
                    { label: '신청 일시', value: selectedVo.updateDate || selectedVo.bookDate },
                ]} />
            )}
        </AppModal>
    );
};

export default BookModal;
