import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

/*
 * 화면 오른쪽 위에 잠깐 떴다 사라지는 안내.
 *   import { notify } from '../common/Toast';
 *   notify('저장했습니다.', 'success');   // success | error | info
 * App 에 <ToastHost /> 를 한 번 두면 어디서든 쓸 수 있다.
 */

const listeners = new Set();
let seq = 0;

export const notify = (message, type = 'info') => {
    if (!message) return;
    const toast = { id: ++seq, message, type };
    listeners.forEach(listener => listener(toast));
};

const slideIn = keyframes`
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Stack = styled.div`
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: min(360px, calc(100vw - 32px));
`;

const Item = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 14px;
    border: 1px solid var(--gw-border);
    border-left: 4px solid ${({ $type }) => ({ success: 'var(--gw-success)', error: 'var(--gw-danger)' }[$type] ?? 'var(--gw-primary)')};
    border-radius: var(--gw-radius-sm);
    background: var(--gw-surface);
    box-shadow: 0 10px 30px rgba(16, 24, 40, 0.15);
    font-size: 14px;
    animation: ${slideIn} 0.18s ease-out;

    & > svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: ${({ $type }) => ({ success: 'var(--gw-success)', error: 'var(--gw-danger)' }[$type] ?? 'var(--gw-primary)')};
    }

    & > span {
        flex: 1;
        white-space: pre-line;
    }

    & > button {
        border: none;
        background: none;
        color: var(--gw-text-muted);
        line-height: 1;
    }
`;

const ICONS = { success: <FiCheckCircle />, error: <FiAlertCircle />, info: <FiInfo /> };

export const ToastHost = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const listener = (toast) => {
            // 같은 문구가 겹쳐 뜨지 않게
            setToasts(prev => prev.some(t => t.message === toast.message) ? prev : [...prev, toast].slice(-4));
            setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toast.id)), toast.type === 'error' ? 5000 : 3000);
        };
        listeners.add(listener);
        return () => listeners.delete(listener);
    }, []);

    const close = (id) => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <Stack role="status" aria-live="polite">
            {toasts.map(t => (
                <Item key={t.id} $type={t.type}>
                    {ICONS[t.type] ?? ICONS.info}
                    <span>{t.message}</span>
                    <button type="button" className="gw-reset" onClick={() => close(t.id)} aria-label="닫기"><FiX /></button>
                </Item>
            ))}
        </Stack>
    );
};
