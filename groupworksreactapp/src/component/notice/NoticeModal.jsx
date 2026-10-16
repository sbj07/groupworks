import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import AppModal from '../common/AppModal';
import InfoList from '../common/InfoList';
import Badge from '../common/Badge';
import { API_BASE } from '../../api/config';

const Content = styled.div`
    margin-bottom: 16px;
    padding: 16px;
    min-height: 120px;
    border-radius: var(--gw-radius-sm);
    background: var(--gw-surface-2);
    white-space: pre-wrap;
    line-height: 1.7;
`;

const NoticeModal = ({ notice, onClose, onDelete, showEditAndDelete }) => {
    const navigate = useNavigate();

    if (!notice) return null;

    //수정버튼 함수: NoticeEdit 화면으로 이동
    const handleEdit = () => {
        navigate("/notice/edit", { state: { notice: notice } });
    };

    const handleDelete = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            onDelete(notice.noticeNo);
        }
    };

    const fileName = notice.filePath ? notice.filePath.split('/').pop() : '';

    return (
        <AppModal
            isOpen={!!notice}
            onClose={onClose}
            width={640}
            title={<>{notice.emergencyYn === 'Y' && <Badge $tone="danger" style={{ marginRight: 8 }}>긴급</Badge>}{notice.title}</>}
            subtitle={`${notice.memberName} · ${notice.updateDate || notice.enrollDate} · 조회 ${notice.clickNo}`}
            footer={<>
                {showEditAndDelete && (
                    <>
                        <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>삭제</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>수정</button>
                    </>
                )}
                <button type="button" className="btn btn-primary" onClick={onClose}>닫기</button>
            </>}
        >
            <Content>{notice.content}</Content>
            <InfoList items={[
                { label: '카테고리', value: notice.categoryCon },
                { label: '공개 부서', value: notice.departName },
                { label: '첨부파일', value: fileName && <a href={`${API_BASE}${notice.filePath}`} download={fileName} style={{ color: 'var(--gw-primary)' }}>{fileName}</a> },
            ]} />
        </AppModal>
    );
};

export default NoticeModal;
