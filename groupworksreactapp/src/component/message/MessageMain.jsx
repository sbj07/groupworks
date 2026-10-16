import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FiEdit3 } from 'react-icons/fi';
import ListLayout from '../common/ListLayout';
import SearchBox, { SearchField } from '../common/SearchBox';
import AppModal from '../common/AppModal';
import EmptyState from '../common/EmptyState';
import MessageWrite from './MessageWrite';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

const BOXES = [['inbox', '받은 쪽지'], ['sent', '보낸 쪽지']];
const EMPTY_SEARCH = { name: '', content: '' };

const Tabs = styled.div`
    display: inline-flex;
    gap: 4px;
    padding: 4px;
    border-radius: 10px;
    background: var(--gw-surface-2);

    & > button {
        padding: 6px 12px;
        border: none;
        border-radius: 8px;
        background: transparent;
        color: var(--gw-text-muted);
        font-size: 13px;
        font-weight: 600;
    }

    & > button.active {
        background: var(--gw-surface);
        color: var(--gw-primary);
        box-shadow: var(--gw-shadow-sm);
    }
`;

const Toolbar = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    small {
        color: var(--gw-text-muted);
    }
`;

const Table = styled.table`
    td.content {
        max-width: 0;
        width: 55%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    td small {
        color: var(--gw-text-muted);
    }
`;

const Detail = styled.div`
    dl {
        display: grid;
        grid-template-columns: 72px 1fr;
        gap: 6px 12px;
        margin: 0 0 14px;
        font-size: 13px;
    }

    dt {
        color: var(--gw-text-muted);
        font-weight: 600;
    }

    dd {
        margin: 0;
    }

    p {
        margin: 0;
        padding: 14px 16px;
        border-radius: var(--gw-radius-sm);
        background: var(--gw-surface-2);
        white-space: pre-wrap;
        word-break: break-word;
        line-height: 1.6;
    }
`;

const partnerLabel = (m) => [m.partnerDepartName, m.partnerPositionName].filter(Boolean).join(' · ');

/**
 * 쪽지함
 * - 받은 쪽지 / 보낸 쪽지 탭, 이름·내용으로 조회
 * - 쪽지를 누르면 내용 보기, 받은 쪽지는 답장 가능
 * - 삭제하면 내 쪽지함에서만 지워지고 상대방 쪽지함에는 남는다
 */
const MessageMain = () => {
    const [box, setBox] = useState('inbox');
    const [list, setList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState(EMPTY_SEARCH);
    const [applied, setApplied] = useState(EMPTY_SEARCH);
    const [selected, setSelected] = useState(null);
    const [writeTo, setWriteTo] = useState(undefined); // undefined: 닫힘, null: 새 쪽지, { no, name }: 답장

    const load = useCallback(async () => {
        setLoaded(false);
        const result = await api.get(`/api/message?box=${box}`);
        setList(result.ok ? result.list ?? [] : []);
        setLoaded(true);
    }, [box]);

    useEffect(() => { load(); }, [load]);

    const filtered = useMemo(() => list.filter(m =>
        (!applied.name || (m.partnerName ?? '').includes(applied.name.trim()))
        && (!applied.content || (m.content ?? '').includes(applied.content.trim()))
    ), [list, applied]);

    const handleDelete = async (message) => {
        if (!window.confirm('이 쪽지를 삭제하시겠습니까? 상대방 쪽지함에는 남아 있습니다.')) return;
        const result = await api.delete(`/api/message/${message.no}`);
        if (result.ok) {
            notify(result.message || '쪽지를 삭제했습니다.', 'success');
            setSelected(null);
            load();
        }
    };

    // 보낸 뒤에는 보낸 쪽지함으로 옮겨 방금 보낸 쪽지를 보여준다
    const handleSent = () => {
        setWriteTo(undefined);
        setSelected(null);
        if (box === 'sent') load(); else setBox('sent');
    };

    const partnerHead = box === 'inbox' ? '보낸 사람' : '받는 사람';

    return (
        <ListLayout
            search={
                <SearchBox
                    onSearch={() => setApplied({ ...search })}
                    onReset={() => { setSearch(EMPTY_SEARCH); setApplied(EMPTY_SEARCH); }}
                    extra={<button type="button" className="btn btn-primary d-inline-flex align-items-center gap-1" onClick={() => setWriteTo(null)}><FiEdit3 />쪽지 쓰기</button>}
                >
                    <SearchField label={partnerHead}>
                        <input type="text" value={search.name} onChange={e => setSearch({ ...search, name: e.target.value })} placeholder="이름" />
                    </SearchField>
                    <SearchField label="내용">
                        <input type="text" value={search.content} onChange={e => setSearch({ ...search, content: e.target.value })} placeholder="내용 일부" />
                    </SearchField>
                </SearchBox>
            }
            toolbar={
                <Toolbar>
                    <Tabs>
                        {BOXES.map(([value, label]) => (
                            <button key={value} type="button" className={`gw-reset ${box === value ? 'active' : ''}`} onClick={() => setBox(value)}>{label}</button>
                        ))}
                    </Tabs>
                    <small>총 {filtered.length}건</small>
                </Toolbar>
            }
        >
            <Table className="clickable">
                <thead>
                    <tr>
                        <th>{partnerHead}</th>
                        <th>부서 · 직책</th>
                        <th>내용</th>
                        <th>{box === 'inbox' ? '받은 날짜' : '보낸 날짜'}</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length === 0 ? (
                        <tr><td colSpan="4"><EmptyState $compact>{!loaded ? '불러오는 중...' : list.length === 0 ? '쪽지가 없습니다.' : '조회조건에 맞는 쪽지가 없습니다.'}</EmptyState></td></tr>
                    ) : filtered.map(m => (
                        <tr key={m.no} onClick={() => setSelected(m)}>
                            <td>{m.partnerName}</td>
                            <td><small>{partnerLabel(m) || '-'}</small></td>
                            <td className="content">{m.content}</td>
                            <td><small>{m.sendDate}</small></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <AppModal
                isOpen={!!selected}
                onClose={() => setSelected(null)}
                title={box === 'inbox' ? '받은 쪽지' : '보낸 쪽지'}
                width={560}
                footer={selected && <>
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(selected)}>삭제</button>
                    {box === 'inbox' && <button type="button" className="btn btn-primary" onClick={() => setWriteTo({ no: selected.partnerNo, name: selected.partnerName })}>답장</button>}
                </>}
            >
                {selected && (
                    <Detail>
                        <dl>
                            <dt>{partnerHead}</dt>
                            <dd>{selected.partnerName} {partnerLabel(selected) && <small className="text-muted">({partnerLabel(selected)})</small>}</dd>
                            <dt>날짜</dt>
                            <dd>{selected.sendDate}</dd>
                        </dl>
                        <p>{selected.content}</p>
                    </Detail>
                )}
            </AppModal>

            <MessageWrite isOpen={writeTo !== undefined} to={writeTo} onClose={() => setWriteTo(undefined)} onSent={handleSent} />
        </ListLayout>
    );
};

export default MessageMain;
