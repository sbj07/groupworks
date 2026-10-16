/*
 * 입력값 검사 도우미 (서버 Check.java 와 같은 규칙)
 *
 *   const error = firstError([
 *       required(form.title, '제목'),
 *       maxLength(form.title, 100, '제목'),
 *   ]);
 *   if (error) { notify(error, 'error'); return; }
 */

// 받침에 맞는 조사
export const josa = (word, withBatchim, withoutBatchim) => {
    if (!word) return withoutBatchim;
    const code = word.charCodeAt(word.length - 1);
    const batchim = code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 !== 0;
    return word + (batchim ? withBatchim : withoutBatchim);
};

const isBlank = (value) => value === undefined || value === null || String(value).trim() === '';

export const required = (value, label) => (isBlank(value) ? `${josa(label, '을', '를')} 입력해주세요.` : null);

export const selected = (value, label) => (isBlank(value) ? `${josa(label, '을', '를')} 선택해주세요.` : null);

export const maxLength = (value, max, label) =>
    !isBlank(value) && String(value).length > max ? `${josa(label, '은', '는')} ${max}자 이하로 입력해주세요.` : null;

export const memberId = (id) =>
    required(id, '아이디') || (/^[A-Za-z0-9_]{4,20}$/.test(id) ? null : '아이디는 영문, 숫자, _ 로 4~20자여야 합니다.');

export const password = (pwd, label = '비밀번호') =>
    required(pwd, label) || (pwd.length >= 4 && pwd.length <= 30 ? null : `${josa(label, '은', '는')} 4~30자로 입력해주세요.`);

export const email = (value) =>
    isBlank(value) || /^[\w.+-]+@[\w-]+(\.[\w-]+)*$/.test(value) ? null : '이메일 형식이 올바르지 않습니다.';

export const tel = (value) =>
    isBlank(value) || /^0\d{8,10}$/.test(String(value).replace(/-/g, '')) ? null : '연락처는 숫자 9~11자리로 입력해주세요.';

// 시작 ≤ 종료 (날짜 문자열 비교)
export const dateOrder = (start, end, message = '종료일이 시작일보다 빠를 수 없습니다.') =>
    !isBlank(start) && !isBlank(end) && end < start ? message : null;

// 시작 < 종료 (날짜시간)
export const dateTimeOrder = (start, end) =>
    !isBlank(start) && !isBlank(end) && end <= start ? '종료 시간은 시작 시간보다 늦어야 합니다.' : null;

const ALLOWED_FILES = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'txt', 'hwp', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip'];

export const attachment = (file, maxMb = 5) => {
    if (!file) return null;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_FILES.includes(ext)) return `첨부할 수 없는 파일 형식입니다. (${ALLOWED_FILES.join(', ')})`;
    if (file.size > maxMb * 1024 * 1024) return `첨부파일은 ${maxMb}MB 이하만 올릴 수 있습니다.`;
    return null;
};

export const firstError = (results) => results.find(Boolean) || null;
