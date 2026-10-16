import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

Modal.setAppElement('#root');

const Body = styled.div`
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 80px);

    & > header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 20px 22px 14px;
        border-bottom: 1px solid var(--gw-border);
    }

    & > header h2 {
        margin: 0;
        font-size: 17px;
        line-height: 1.4;
    }

    & > header small {
        display: block;
        margin-top: 2px;
        color: var(--gw-text-muted);
    }

    & > header .close {
        flex-shrink: 0;
        border: none;
        background: none;
        color: var(--gw-text-muted);
        font-size: 18px;
        line-height: 1;
    }

    & > .content {
        padding: 18px 22px;
        overflow-y: auto;
    }

    & > footer {
        display: flex;
        justify-content: flex-end;
        gap: 6px;
        padding: 14px 22px;
        border-top: 1px solid var(--gw-border);
        background: var(--gw-surface-2);
        border-radius: 0 0 var(--gw-radius) var(--gw-radius);
    }

    & > footer .btn + .btn {
        margin-left: 0;
    }
`;

/**
 * 화면 공통 모달
 * - title / subtitle: 머리글
 * - footer: 아래쪽 버튼 영역 (없으면 그리지 않는다)
 * - width: 최대 너비(px)
 */
const AppModal = ({ isOpen, onClose, title, subtitle, footer, width = 520, children }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel={typeof title === 'string' ? title : '창'}
        style={{
            overlay: { backgroundColor: 'rgba(15, 23, 42, 0.45)', zIndex: 100 },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                width: `min(${width}px, calc(100vw - 32px))`,
                padding: 0,
                overflow: 'visible',
            },
        }}
    >
        <Body>
            {(title || onClose) && (
                <header>
                    <div>
                        {title && <h2>{title}</h2>}
                        {subtitle && <small>{subtitle}</small>}
                    </div>
                    {onClose && <button type="button" className="close gw-reset" onClick={onClose} aria-label="닫기"><FiX /></button>}
                </header>
            )}
            <div className="content">{children}</div>
            {footer && <footer>{footer}</footer>}
        </Body>
    </Modal>
);

export default AppModal;
