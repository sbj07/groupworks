import React from 'react';

/**
 * 목록 화면 공통 틀
 *   ┌ 조회조건 카드 (search) ┐
 *   └──────────────────────┘
 *   ┌ 표 카드 (children)     ┐  ← 남은 화면 높이를 채운다
 *   │ ...                   │
 *   │        footer(페이지)  │  ← 카드 맨 아래
 *   └──────────────────────┘
 * 페이지 카드(gw-page) 안에 들어가면 바깥 카드는 theme.css 에서 투명하게 바뀐다.
 */
const ListLayout = ({ search, toolbar, footer, children }) => (
    <div className="gw-list-layout">
        {search && <div className="gw-card gw-list-search">{search}</div>}
        <div className="gw-card gw-list-body">
            {toolbar && <div className="gw-list-toolbar">{toolbar}</div>}
            <div className="gw-list-scroll">{children}</div>
            {footer && <div className="gw-list-footer">{footer}</div>}
        </div>
    </div>
);

export default ListLayout;
