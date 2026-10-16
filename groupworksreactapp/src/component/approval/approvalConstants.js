// 결재 문서 종류 (주소의 type 과 서버 docType)
export const DOC_TYPES = {
    vacation: { label: '휴가신청서', server: 'VACATION', statement: '위와 같이 휴가를 신청하오니 허락하여 주시기 바랍니다.', placeholder: '휴가 사유와 인수인계 내용을 적어주세요.' },
    business: { label: '출장신청서', server: 'BUSINESS', statement: '위와 같이 출장을 신청하오니 허락하여 주시기 바랍니다.', placeholder: '출장지, 목적, 일정을 적어주세요.' },
};

export const typeOfServer = (docType) =>
    Object.keys(DOC_TYPES).find(key => DOC_TYPES[key].server === docType) ?? 'vacation';

// 문서 상태 (CATEGORY_NO)
export const DOC_STATUS = {
    '1': { label: '진행중', tone: 'primary' },
    '2': { label: '승인', tone: 'success' },
    '3': { label: '반려', tone: 'danger' },
};

// 휴가 구분
export const VACATION_KINDS = { '1': '연차', '2': '반차', '3': '병가', '4': '육아' };

export const CONTENT_MAX = 300;

// 서버 문서 → 결재란 표시용
export const approversOf = (doc) => ({
    firstApply: { name: doc.firstApplyName, status: doc.firstStatus },
    midApply: { name: doc.midApplyName, status: doc.midStatus },
    lastApply: { name: doc.lastApplyName, status: doc.lastStatus },
});

// 세 명 중 승인한 사람 수
export const approvedCount = (doc) => [doc.firstStatus, doc.midStatus, doc.lastStatus].filter(s => s === '2').length;
