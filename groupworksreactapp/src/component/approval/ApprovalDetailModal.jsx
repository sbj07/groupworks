import React, { useState } from 'react';
import AppModal from '../common/AppModal';
import Badge from '../common/Badge';
import { DocHeader, DocTable, ApprovalLine } from './ApprovalDoc';
import { DOC_STATUS, DOC_TYPES, VACATION_KINDS, approversOf, typeOfServer } from './approvalConstants';
import { api } from '../../api/http';
import { notify } from '../common/Toast';
import { firstError, required, maxLength } from '../../utils/validate';

/**
 * 결재 문서 보기
 * - mode="mine": 내가 올린 문서 (진행중이면 삭제 가능)
 * - mode="pending": 내가 승인할 문서 (승인/반려)
 * - onChanged: 처리 후 목록 새로고침
 */
const ApprovalDetailModal = ({ doc, mode, onClose, onChanged }) => {
    const [rejecting, setRejecting] = useState(false);
    const [rejection, setRejection] = useState('');
    const [busy, setBusy] = useState(false);

    if (!doc) return null;

    const type = typeOfServer(doc.docType);
    const status = DOC_STATUS[doc.categoryNo] ?? DOC_STATUS['1'];
    const base = `/api/approval/${type}/${doc.no}`;

    const close = () => {
        setRejecting(false);
        setRejection('');
        onClose();
    };

    const finish = (result) => {
        setBusy(false);
        if (result.ok) {
            notify(result.message, 'success');
            close();
            onChanged?.();
        }
    };

    const handleApprove = async () => {
        if (!window.confirm('이 문서를 승인하시겠습니까?')) return;
        setBusy(true);
        finish(await api.post(`${base}/approve`));
    };

    const handleReject = async () => {
        const error = firstError([required(rejection, '반려 사유'), maxLength(rejection, 300, '반려 사유')]);
        if (error) {
            notify(error, 'error');
            return;
        }
        setBusy(true);
        finish(await api.post(`${base}/reject`, { rejection: rejection.trim() }));
    };

    const handleDelete = async () => {
        if (!window.confirm('이 문서를 삭제하시겠습니까? 삭제하면 되돌릴 수 없습니다.')) return;
        setBusy(true);
        finish(await api.delete(base));
    };

    const footer = rejecting ? (
        <>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setRejecting(false)} disabled={busy}>취소</button>
            <button type="button" className="btn btn-danger" onClick={handleReject} disabled={busy}>반려하기</button>
        </>
    ) : (
        <>
            {mode === 'mine' && doc.categoryNo === '1' && (
                <button type="button" className="btn btn-outline-danger" onClick={handleDelete} disabled={busy}>삭제</button>
            )}
            {mode === 'pending' && (
                <>
                    <button type="button" className="btn btn-outline-danger" onClick={() => setRejecting(true)} disabled={busy}>반려</button>
                    <button type="button" className="btn btn-success" onClick={handleApprove} disabled={busy}>승인</button>
                </>
            )}
            <button type="button" className="btn btn-primary" onClick={close}>닫기</button>
        </>
    );

    return (
        <AppModal isOpen={!!doc} onClose={close} width={760} footer={footer}>
            <DocHeader style={{ marginBottom: 18, paddingBottom: 18 }}>
                <div>
                    <h1 style={{ fontSize: 24 }}>{DOC_TYPES[type].label}</h1>
                    <div className="doc-meta">
                        문서번호 {doc.no} · 작성일 {doc.writeDate} <Badge $tone={status.tone} style={{ marginLeft: 6 }}>{status.label}</Badge>
                    </div>
                </div>
                <ApprovalLine approvers={approversOf(doc)} />
            </DocHeader>
            <DocTable>
                <div className="label">작성자</div>
                <div className="value">{doc.writerName}</div>
                <div className="label">부서 / 직급</div>
                <div className="value">{[doc.writerDepartName, doc.writerPositionName].filter(Boolean).join(' / ')}</div>
                <div className="label">기간</div>
                <div className={`value ${type === 'vacation' ? '' : 'full'}`}>{doc.startTime} ~ {doc.finishTime}</div>
                {type === 'vacation' && (
                    <>
                        <div className="label">휴가 구분</div>
                        <div className="value">{VACATION_KINDS[doc.vacationNo] ?? '-'}</div>
                    </>
                )}
                <div className="label">세부사항</div>
                <div className="value full" style={{ whiteSpace: 'pre-wrap', alignItems: 'flex-start', minHeight: 140 }}>{doc.content}</div>
                {doc.documentDate && (
                    <>
                        <div className="label">결재일</div>
                        <div className="value full">{doc.documentDate}</div>
                    </>
                )}
                {doc.rejection && (
                    <>
                        <div className="label">반려 사유</div>
                        <div className="value full" style={{ color: 'var(--gw-danger)', whiteSpace: 'pre-wrap' }}>{doc.rejection}</div>
                    </>
                )}
            </DocTable>
            {rejecting && (
                <div style={{ marginTop: 16 }}>
                    <label className="form-label" htmlFor="rejection">반려 사유</label>
                    <textarea id="rejection" className="form-control" rows={4} maxLength={300} value={rejection}
                        onChange={e => setRejection(e.target.value)} placeholder="작성자에게 전달될 반려 사유를 적어주세요." autoFocus />
                </div>
            )}
        </AppModal>
    );
};

export default ApprovalDetailModal;
