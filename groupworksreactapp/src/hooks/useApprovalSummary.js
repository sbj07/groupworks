import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../api/http';

const EMPTY = { myTotal: 0, myInProgress: 0, myApproved: 0, myRejected: 0, pendingForMe: 0 };

// 결재 건수 (내가 올린 문서 상태별, 내가 승인할 문서). 화면을 옮길 때마다 새로 읽는다.
const useApprovalSummary = () => {
    const { pathname } = useLocation();
    const [summary, setSummary] = useState(EMPTY);

    useEffect(() => {
        let alive = true;
        api.get('/api/approval/summary').then(data => {
            if (alive && data.ok) setSummary({ ...EMPTY, ...data });
        });
        return () => { alive = false; };
    }, [pathname]);

    return summary;
};

export default useApprovalSummary;
