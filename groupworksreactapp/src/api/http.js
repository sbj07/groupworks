import { API_BASE } from './config';
import { notify } from '../component/common/Toast';

/*
 * 백엔드 호출 공통 처리
 * - 로그인 토큰을 Authorization 헤더에 붙인다.
 * - 401: 로그인이 풀린 것이므로 로그인 화면으로 보낸다.
 * - 403/4xx/5xx: 서버가 준 message 를 토스트로 보여준다.
 * - 서버에 연결하지 못하면 안내한다.
 *
 * 기존 화면들이 fetch 를 직접 부르고 있어서, 앱 시작 때 window.fetch 를 감싸는 방식으로 적용한다.
 * 새 코드에서는 아래 api.get / api.post 를 쓰면 응답 JSON 을 바로 받는다.
 */

const TOKEN_KEY = 'accessToken';
const MEMBER_KEY = 'loginMemberNo';

export const auth = {
    getToken: () => sessionStorage.getItem(TOKEN_KEY),
    login: (token, memberNo) => {
        sessionStorage.setItem(TOKEN_KEY, token);
        sessionStorage.setItem(MEMBER_KEY, memberNo);
    },
    logout: () => {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(MEMBER_KEY);
    },
    isLoggedIn: () => !!sessionStorage.getItem(TOKEN_KEY) && !!sessionStorage.getItem(MEMBER_KEY),
};

const isApiUrl = (url) => typeof url === 'string' && url.startsWith(API_BASE);

// 응답 본문에서 서버 메시지 꺼내기 (원래 응답은 그대로 둔다)
const serverMessage = async (response) => {
    try {
        const data = await response.clone().json();
        return data?.message;
    } catch {
        return null;
    }
};

let redirecting = false;

export const installFetchInterceptor = () => {
    if (window.__gwFetchInstalled) return;
    window.__gwFetchInstalled = true;
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input, init = {}) => {
        const url = typeof input === 'string' ? input : input?.url;
        if (!isApiUrl(url)) {
            return originalFetch(input, init);
        }

        const headers = new Headers(init.headers || {});
        const token = auth.getToken();
        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        let response;
        try {
            response = await originalFetch(input, { ...init, headers });
        } catch (error) {
            notify('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.', 'error');
            throw error;
        }

        if (response.status === 401 && token) {
            auth.logout();
            if (!redirecting) {
                redirecting = true;
                notify('로그인이 만료되었습니다. 다시 로그인해주세요.', 'error');
                setTimeout(() => { window.location.href = '/login'; }, 800);
            }
        } else if (!response.ok && response.status !== 401) {
            const message = await serverMessage(response);
            notify(message || '요청을 처리하지 못했습니다.', 'error');
        }
        return response;
    };
};

// 새 코드용: 성공하면 JSON, 실패하면 { ok: false, message } 를 돌려준다 (안내는 위에서 이미 띄움)
const request = async (method, path, body) => {
    const init = { method, headers: {} };
    if (body instanceof FormData) {
        init.body = body;
    } else if (body !== undefined) {
        init.headers['Content-Type'] = 'application/json';
        init.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(`${API_BASE}${path}`, init);
        const data = await response.json().catch(() => ({}));
        return response.ok ? { ok: true, ...data } : { ok: false, ...data };
    } catch {
        return { ok: false, message: '서버에 연결할 수 없습니다.' };
    }
};

export const api = {
    get: (path) => request('GET', path),
    post: (path, body) => request('POST', path, body ?? {}),
    put: (path, body) => request('PUT', path, body ?? {}),
    delete: (path) => request('DELETE', path),
};
