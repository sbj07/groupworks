import { useEffect, useState } from 'react';
import { API_BASE } from '../api/config';

// 로그인한 회원 정보를 불러온다.
const useLoginMember = () => {
    const loginMemberNo = sessionStorage.getItem('loginMemberNo');
    const [member, setMember] = useState(null);

    useEffect(() => {
        if (!loginMemberNo) return;
        fetch(`${API_BASE}/api/member/${loginMemberNo}`)
            .then((resp) => resp.json())
            .then((data) => setMember(data.loginMemberVo ?? null))
            .catch(() => setMember(null));
    }, [loginMemberNo]);

    return member;
};

export default useLoginMember;
