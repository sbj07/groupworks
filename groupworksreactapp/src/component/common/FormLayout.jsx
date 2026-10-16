import React from 'react';
import styled from 'styled-components';

/*
 * 작성/수정 화면 공통 폼.
 * <Form>
 *   <Label>제목 <Input .../></Label>
 *   ...
 *   <SubmitButton>저장</SubmitButton>
 * </Form>
 * Label 의 첫 글자들은 라벨, 그 뒤 입력칸이 아래로 붙는다.
 */

export const formStyle = `
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 720px;

    & > h1,
    & > h2 {
        margin: 0 0 4px;
        font-size: 20px;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin: 0;
        color: var(--gw-text-muted);
        font-size: 13px;
        font-weight: 600;
    }

    input:not([type='checkbox']):not([type='radio']):not([type='file']),
    textarea,
    select {
        width: 100%;
        padding: 9px 12px;
        border: 1px solid var(--gw-border);
        border-radius: var(--gw-radius-sm);
        background: var(--gw-surface);
        color: var(--gw-text);
        font-size: 14px;
        font-weight: 400;
    }

    input[type='file'] {
        color: var(--gw-text);
        font-size: 13px;
        font-weight: 400;
    }

    textarea {
        min-height: 220px;
        resize: vertical;
        line-height: 1.6;
    }

    input:focus,
    textarea:focus,
    select:focus {
        outline: none;
        border-color: var(--gw-primary);
        box-shadow: 0 0 0 3px rgba(36, 89, 224, 0.15);
    }

    .readonly {
        padding: 9px 12px;
        border-radius: var(--gw-radius-sm);
        background: var(--gw-surface-2);
        color: var(--gw-text);
        font-size: 14px;
        font-weight: 400;
    }

    .row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
    }

    br {
        display: none;
    }
`;

export const Form = styled.form`
    ${formStyle}
`;

// 폼을 감싸는 영역 (기존 수정 화면용)
export const FormShell = styled.div`
    ${formStyle}

    & > form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
`;

export const Label = styled.label``;
export const Input = styled.input``;
export const TextArea = styled.textarea``;
export const Select = styled.select``;

export const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--gw-border);

    & .btn + .btn {
        margin-left: 0;
    }
`;

// 저장 버튼 (취소 버튼과 함께 오른쪽 정렬)
export const SubmitButton = ({ children = '저장', onCancel, ...props }) => (
    <FormActions>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel ?? (() => window.history.back())}>취소</button>
        <button type="submit" className="btn btn-primary" {...props}>{children}</button>
    </FormActions>
);
