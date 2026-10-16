import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import Pagination from '../common/Pagination';
import ListLayout from '../common/ListLayout';
import ApprovalDetailModal from './ApprovalDetailModal';
import { DOC_STATUS, DOC_TYPES, VACATION_KINDS, approvedCount, typeOfServer } from './approvalConstants';
import { api } from '../../api/http';

const Toolbar = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    .left {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
    }

    .tabs {
        display: inline-flex;
        gap: 4px;
        padding: 4px;
        border-radius: 10px;
        background: var(--gw-surface-2);
    }

    .tabs > button {
        padding: 6px 12px;
        border: none;
        border-radius: 8px;
        background: transparent;
        color: var(--gw-text-muted);
        font-size: 13px;
        font-weight: 600;
    }

    .tabs > button.active {
        background: var(--gw-surface);
        color: var(--gw-primary);
        box-shadow: var(--gw-shadow-sm);
    }

    select {
        width: auto;
        min-width: 150px;
    }

    .count {
        color: var(--gw-text-muted);
        font-size: 13px;
    }
`;

const Progress = styled.span`
    display: inline-flex;
    gap: 4px;

    & > i {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--gw-border);
    }

    & > i.s2 {
        background: var(--gw-success);
    }

    & > i.s3 {
        background: var(--gw-danger);
    }
`;

const STATUS_TABS = [['', '전체'], ['1', '진행중'], ['2', '승인'], ['3', '반려']];
const LIMIT = 10;

/**
 * 결재 목록
 * - mode="mine": 내가 올린 결재내역 (상태 탭)
 * - mode="pending": 내가 승인할 문서
 */
const ApprovalList = ({ mode }) => {
    const [docType, setDocType] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [data, setData] = useState({ list: [], totalCount: 0, maxPage: 1 });
    const [loaded, setLoaded] = useState(false);
    const [selected, setSelected] = useState(null);

    const load = useCallback(async () => {
        const params = new URLSearchParams({ page, limit: LIMIT });
        if (docType) params.append('type', docType);
        if (mode === 'mine' && status) params.append('status', status);
        const result = await api.get(`/api/approval/${mode === 'mine' ? 'my' : 'pending'}?${params}`);
        if (result.ok) {
            setData({ list: result.list ?? [], totalCount: result.totalCount ?? 0, maxPage: result.pageInfo?.maxPage ?? 1 });
        }
        setLoaded(true);
    }, [mode, docType, status, page]);

    useEffect(() => { load(); }, [load]);

    // 메뉴를 바꾸면 조건 초기화
    useEffect(() => {
        setDocType('');
        setStatus('');
        setPage(1);
    }, [mode]);

    const changeFilter = (setter) => (value) => {
        setter(value);
        setPage(1);
    };

    const columns = mode === 'mine' ? 7 : 6;

    return (
        <ListLayout
            footer={<Pagination currentPage={page} totalPages={data.maxPage} onChange={setPage} />}
            search={<Toolbar>
                <div className="left">
                    <select className="form-select" value={docType} onChange={e => changeFilter(setDocType)(e.target.value)} aria-label="문서 종류">
                        <option value="">전체 문서</option>
                        {Object.entries(DOC_TYPES).map(([key, t]) => <option key={key} value={key}>{t.label}</option>)}
                    </select>
                    {mode === 'mine' && (
                        <div className="tabs">
                            {STATUS_TABS.map(([value, label]) => (
                                <button key={value} type="button" className={`gw-reset ${status === value ? 'active' : ''}`} onClick={() => changeFilter(setStatus)(value)}>{label}</button>
                            ))}
                        </div>
                    )}
                    <span className="count">총 {data.totalCount}건</span>
                </div>
                {mode === 'mine' && (
                    <div className="d-flex gap-2">
                        <Link className="btn btn-outline-primary" to="/approval/write/vacation">휴가신청서 작성</Link>
                        <Link className="btn btn-outline-primary" to="/approval/write/business">출장신청서 작성</Link>
                    </div>
                )}
            </Toolbar>}
        >
            <table className="clickable">
                <thead>
                    <tr>
                        <th>문서번호</th>
                        <th>문서</th>
                        {mode === 'pending' && <th>작성자</th>}
                        <th>기간</th>
                        <th>작성일</th>
                        <th>결재 진행</th>
                        {mode === 'mine' && <th>결재일</th>}
                        {mode === 'mine' && <th>상태</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.list.length === 0 ? (
                        <tr><td colSpan={columns}>
                            <EmptyState $compact>{!loaded ? '불러오는 중...' : mode === 'mine' ? '작성한 결재 문서가 없습니다.' : '승인을 기다리는 문서가 없습니다.'}</EmptyState>
                        </td></tr>
                    ) : data.list.map(doc => {
                        const type = typeOfServer(doc.docType);
                        const st = DOC_STATUS[doc.categoryNo] ?? DOC_STATUS['1'];
                        return (
                            <tr key={`${doc.docType}-${doc.no}`} onClick={() => setSelected(doc)}>
                                <td>{doc.no}</td>
                                <td>
                                    {DOC_TYPES[type].label}
                                    {type === 'vacation' && VACATION_KINDS[doc.vacationNo] && <small className="text-muted"> · {VACATION_KINDS[doc.vacationNo]}</small>}
                                </td>
                                {mode === 'pending' && <td>{doc.writerName} <small className="text-muted">{doc.writerDepartName}</small></td>}
                                <td>{doc.startTime} ~ {doc.finishTime}</td>
                                <td>{doc.writeDate}</td>
                                <td title={`${approvedCount(doc)} / 3 승인`}>
                                    <Progress>
                                        {[doc.firstStatus, doc.midStatus, doc.lastStatus].map((s, i) => <i key={i} className={`s${s}`} />)}
                                    </Progress>
                                </td>
                                {mode === 'mine' && <td>{doc.documentDate || '-'}</td>}
                                {mode === 'mine' && <td><Badge $tone={st.tone}>{st.label}</Badge></td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <ApprovalDetailModal doc={selected} mode={mode} onClose={() => setSelected(null)} onChanged={load} />
        </ListLayout>
    );
};

export default ApprovalList;
