# 프론트 공통 컴포넌트 안내

화면을 새로 만들거나 고칠 때 아래 공통 컴포넌트를 먼저 쓰면 디자인이 저절로 맞습니다.
색, 글꼴, 간격은 `src/styles/theme.css` 의 `--gw-*` 변수로 관리합니다.

## API 호출과 로그인

```js
import { api } from '../../api/http';

const result = await api.get('/api/approval/summary');   // { ok, ...응답 }
if (result.ok) { ... }
await api.post('/book/insert', body);                   // FormData 도 그대로 넘기면 된다
```

- 로그인하면 `auth.login(token, memberNo)` 로 토큰을 저장하고, 모든 요청에 `Authorization: Bearer` 가 자동으로 붙는다.
- 401 이면 로그인 화면으로 보내고, 그 밖의 오류는 서버가 준 `message` 를 토스트로 띄운다. (기존 `fetch` 호출도 같은 처리를 받는다)
- 주소는 `API_BASE` (기본 `http://127.0.0.1:8888/app`, `.env` 의 `REACT_APP_API_URL` 로 변경)

## 안내 메시지와 입력값 검사

```js
import { notify } from '../common/Toast';
import { firstError, required, maxLength, dateOrder } from '../../utils/validate';

const error = firstError([required(form.title, '제목'), maxLength(form.title, 100, '제목')]);
if (error) { notify(error, 'error'); return; }
notify('저장했습니다.', 'success');
```

`utils/validate.js` 의 규칙은 서버 `common/validation/Check.java` 와 같다. (아이디, 비밀번호, 이메일, 연락처, 날짜 순서, 첨부파일)

## 레이아웃

| 컴포넌트 | 위치 | 쓰임 |
|---|---|---|
| `Layout` / `Sidebar` / `Topbar` | `component/` | 고정 사이드바, 상단 제목/사용자, 본문 스크롤 |
| `Card` | `common/Card.jsx` | 흰 카드. `title`, `action`(오른쪽 버튼) |
| `AuthLayout`, `AuthCard` | `authentication/AuthLayout.jsx` | 로그인/회원가입 화면 틀 |

## 목록 화면

| 컴포넌트 | 쓰임 |
|---|---|
| `SearchBox`, `SearchField` | 조회조건 박스. `onSearch`, `onReset`, `extra`(작성 버튼 등), `SearchField span={2}` 로 넓게 |
| `Pagination` | `currentPage`, `totalPages`, `onChange(page)` |
| `Badge` | 상태 표시. `$tone="primary | success | danger | warning | gray"` |
| `EmptyState` | 빈 목록 문구. `$compact` 로 작게 |

카드 안의 `<table>` 은 `theme.css` 에서 자동으로 같은 모양(머리글, 줄 구분, 마우스 오버)이 됩니다.

## 상세/수정 창

```jsx
<AppModal
    isOpen={open}
    onClose={close}
    title="예약 상세"
    subtitle="예약 번호 3"
    width={460}
    footer={<button className="btn btn-primary" onClick={close}>닫기</button>}
>
    <InfoList items={[{ label: '예약자', value: name }, { label: '장소', value: place }]} />
</AppModal>
```

- `AppModal`: 머리글(제목, 닫기), 본문, 아래 버튼 영역
- `InfoList`: 라벨/값 목록, 값이 비면 `-`

## 작성/수정 화면

```jsx
import { Form, Label, Input, TextArea, Select, SubmitButton } from '../common/FormLayout';

<Form onSubmit={handleSubmit}>
    <Label>제목 <Input name="title" /></Label>
    <Label>내용 <TextArea name="content" /></Label>
    <SubmitButton>저장</SubmitButton>   {/* 취소 + 저장 버튼 */}
</Form>
```

읽기 전용 값은 `<span className="readonly">` 로 감쌉니다.

## 전자결재

화면: `approval/` (양식별 작성 `ApprovalWrite`, 결재내역/승인대기 `ApprovalList`, 문서 보기·승인·반려 `ApprovalDetailModal`, 홈 `ApprovalSummaryCard`)
API: `/api/approval/...` (휴가·출장 공통, `{type}` 은 vacation / business)

`approval/ApprovalDoc.jsx`

- `DocSheet`, `DocHeader`, `DocTable`, `DocFooter`, `DocActions`: 결재 문서 한 장의 틀
- `ApprovalLine`: 최초/중간/최종 결재란 (`onPick` 을 주면 칸을 눌러 승인자 지정)
- `ApproverPicker`: 승인자 검색/선택 창
- `ChoiceGroup`: 휴가 구분 같은 선택 버튼

## 버튼

Bootstrap 클래스를 그대로 씁니다: `btn btn-primary`, `btn btn-outline-secondary`, `btn btn-outline-danger`, `btn-sm`.
