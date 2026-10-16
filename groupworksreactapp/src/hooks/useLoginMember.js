import { useEffect, useState } from 'react';
import { API_BASE } from '../api/config';

// 로그인한 회원 정보를 불러온다.
const useLoginMember = () => {
    const loginMemberNo = sessionStorage.getItem('loginMemberNo');
    const [member, setMember] = useState(null);

    useEffect(() => {
        if (!loginMemberNo) return;
        const load = () => fetch(`${API_BASE}/api/member/${loginMemberNo}`)
            .then((resp) => resp.json())
            .then((data) => setMember(data.loginMemberVo ?? null))
            .catch(() => setMember(null));
        load();
        // 근무 상태, 개인정보를 바꾼 화면이 알려주면 다시 읽는다
        window.addEventListener('gw:member-changed', load);
        return () => window.removeEventListener('gw:member-changed', load);
    }, [loginMemberNo]);

    return member;
};

export default useLoginMember;
