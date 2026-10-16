import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FiUserPlus } from 'react-icons/fi';
import ListLayout from '../common/ListLayout';
import SearchBox, { SearchField } from '../common/SearchBox';
import AppModal from '../common/AppModal';
import EmptyState from '../common/EmptyState';
import Badge from '../common/Badge';
import AddMember from './AddMember';
import { api } from '../../api/http';
import { notify } from '../common/Toast';

const EMPTY_SEARCH = { name: '', departNo: '', positionNo: '', authNo: '' };

const Table = styled.table`
    td select {
        min-width: 110px;
        padding: 5px 8px;
        border: 1px solid var(--gw-border);
        border-radius: var(--gw-radius-sm);
        background: var(--gw-surface);
        font-size: 13px;
    }

    td select.changed {
        border-color: var(--gw-primary);
        background: var(--gw-primary-soft);
    }

    td .btn {
        padding: 4px 10px;
        font-size: 12px;
    }

    td small {
        color: var(--gw-text-muted);
    }
`;

/**
 * 인사관리 > 인원관리 (관리자)
 * - 조회조건: 이름, 부서, 직책, 권한
 * - 행에서 부서/직책/권한을 고른 뒤 "변경" 한 번으로 저장 (서버에서 UPDATE 1회)
 * - "인원추가" 버튼은 모달
 */
const MemberManage = () => {
    const loginMemberNo = sessionStorage.getItem('loginMemberNo');
    const [members, setMembers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [codes, setCodes] = useState({ depart: [], position: [], auth: [] });
    const [search, setSearch] = useState(EMPTY_SEARCH);
    const [applied, setApplied] = useState(EMPTY_SEARCH);
    const [edits, setEdits] = useState({});           // { memberNo: { departNo, positionNo, authNo } }
    const [addOpen, setAddOpen] = useState(false);
    const [busy, setBusy] = useState('');

    const load = useCallback(async () => {
        const result = await api.get(`/api/member/list/${loginMemberNo}`);
        if (result.ok) setMembers(result.list ?? []);
        setEdits({});
        setLoaded(true);
    }, [loginMemberNo]);

    useEffect(() => {
        load();
        Promise.all([
            api.get('/api/member/list/depart'),
            api.get('/api/member/list/position'),
            api.get('/api/member/list/auth'),
        ]).then(([d, p, a]) => setCodes({
            depart: d.departList ?? [],
            position: p.positionList ?? [],
            auth: a.authList ?? [],
        }));
    }, [load]);

    const filtered = useMemo(() => members.filter(m =>
        (!applied.name || (m.name ?? '').includes(applied.name.trim()))
        && (!applied.departNo || m.departNo === applied.departNo)
        && (!applied.positionNo || m.positionNo === applied.positionNo)
        && (!applied.authNo || m.authNo === applied.authNo)
    ), [members, applied]);

    const valueOf = (member, field) => edits[member.no]?.[field] ?? member[field] ?? '';
    const isChanged = (member, field) => edits[member.no]?.[field] !== undefined && edits[member.no][field] !== member[field];
    const rowChanged = (member) => ['departNo', 'positionNo', 'authNo'].some(f => isChanged(member, f));

    const handleEdit = (member, field, value) => {
        setEdits(prev => ({ ...prev, [member.no]: { ...prev[member.no], [field]: value } }));
    };

    const handleSave = async (member) => {
        setBusy(member.no);
        const result = await api.put(`/api/member/${member.no}/hr`, {
            departNo: valueOf(member, 'departNo'),
            positionNo: valueOf(member, 'positionNo'),
            authNo: valueOf(member, 'authNo'),
        });
        setBusy('');
        if (result.ok) {
            notify(`${member.name}님의 정보를 변경했습니다.`, 'success');
            load();
        }
    };

    const handleDelete = async (member) => {
        if (!window.confirm(`${member.name}님을 삭제하시겠습니까? 삭제하면 로그인할 수 없습니다.`)) return;
        setBusy(member.no);
        const result = await api.delete(`/api/member/${member.no}`);
        setBusy('');
        if (result.ok) {
            notify(`${member.name}님을 삭제했습니다.`, 'success');
            load();
        }
    };

    const handleSearchChange = (e) => setSearch({ ...search, [e.target.name]: e.target.value });

    const select = (member, field, list, labelKey = 'name') => (
        <select className={isChanged(member, field) ? 'changed' : ''} value={valueOf(member, field)}
            onChange={e => handleEdit(member, field, e.target.value)}>
            {list.map(item => <option key={item.no} value={item.no}>{item[labelKey]}</option>)}
        </select>
    );

    return (
        <ListLayout
            search={
                <SearchBox
                    onSearch={() => setApplied({ ...search })}
                    onReset={() => { setSearch(EMPTY_SEARCH); setApplied(EMPTY_SEARCH); }}
                    extra={<button type="button" className="btn btn-primary d-inline-flex align-items-center gap-1" onClick={() => setAddOpen(true)}><FiUserPlus />인원추가</button>}
                >
                    <SearchField label="이름">
                        <input type="text" name="name" value={search.name} onChange={handleSearchChange} placeholder="이름" />
                    </SearchField>
                    <SearchField label="부서">
                        <select name="departNo" value={search.departNo} onChange={handleSearchChange}>
                            <option value="">전체</option>
                            {codes.depart.map(d => <option key={d.no} value={d.no}>{d.name}</option>)}
                        </select>
                    </SearchField>
                    <SearchField label="직책">
                        <select name="positionNo" value={search.positionNo} onChange={handleSearchChange}>
                            <option value="">전체</option>
                            {codes.position.map(p => <option key={p.no} value={p.no}>{p.name}</option>)}
                        </select>
                    </SearchField>
                    <SearchField label="권한">
                        <select name="authNo" value={search.authNo} onChange={handleSearchChange}>
                            <option value="">전체</option>
                            {codes.auth.map(a => <option key={a.no} value={a.no}>{a.name}</option>)}
                        </select>
                    </SearchField>
                </SearchBox>
            }
            toolbar={<small className="text-muted">총 {filtered.length}명 · 부서/직책/권한을 고른 뒤 "변경"을 누르면 한 번에 저장됩니다.</small>}
        >
            <Table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>연락처</th>
                        <th>이메일</th>
                        <th>부서</th>
                        <th>직책</th>
                        <th>권한</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length === 0 ? (
                        <tr><td colSpan="8"><EmptyState $compact>{loaded ? '조회조건에 맞는 구성원이 없습니다.' : '불러오는 중...'}</EmptyState></td></tr>
                    ) : filtered.map(member => {
                        const self = member.no === loginMemberNo;
                        return (
                            <tr key={member.no}>
                                <td>{member.name} {self && <Badge $tone="primary">나</Badge>}</td>
                                <td><small>{member.id}</small></td>
                                <td>{member.tel || '-'}</td>
                                <td><small>{member.email || '-'}</small></td>
                                <td>{select(member, 'departNo', codes.depart)}</td>
                                <td>{select(member, 'positionNo', codes.position)}</td>
                                <td>{self ? member.authName : select(member, 'authNo', codes.auth)}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" disabled={!rowChanged(member) || busy === member.no} onClick={() => handleSave(member)}>변경</button>{' '}
                                    <button type="button" className="btn btn-outline-danger" disabled={self || busy === member.no} onClick={() => handleDelete(member)} title={self ? '본인은 삭제할 수 없습니다' : undefined}>삭제</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <AppModal isOpen={addOpen} onClose={() => setAddOpen(false)} title="인원추가" subtitle="새 구성원의 계정을 만들고 부서와 직책을 지정합니다." width={560}>
                <AddMember onDone={() => { setAddOpen(false); load(); }} onCancel={() => setAddOpen(false)} />
            </AppModal>
        </ListLayout>
    );
};

export default MemberManage;
