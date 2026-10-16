import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppModal from '../common/AppModal';
import InfoList from '../common/InfoList';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

const BookModal = ({ modalIsOpen, selectedVo, closeModal, refreshList }) => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const navigate = useNavigate();

    const navigateToEdit = () => {
        navigate(`/book/edit`, { state: { selectedVo } });
        closeModal();
    };

    const navigateToDelete = async () => {
        if (!window.confirm('예약을 취소하시겠습니까?')) return;
        const result = await api.delete(`/book/delete/${selectedVo.bookNo}`);
        if (result.ok) {
            notify(result.message, 'success');
            closeModal();
            refreshList?.();
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
                        <button type="button" className="btn btn-outline-danger" onClick={navigateToDelete}>예약 취소</button>
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
