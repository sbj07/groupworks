package com.groupworks.app.security;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdviceAdapter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 화면이 보내는 "내 회원번호/회사번호" 값을 토큰의 값으로 덮어쓴다.
 *
 * 기존 API 는 loginMemberNo, memberNo, writerNo, companyNo 를 요청에서 받아 그대로 믿었기 때문에
 * 번호만 바꾸면 다른 사람으로 행동할 수 있었다. 로그인한 요청에서는 이 값들을 항상 본인 값으로 바꾼다.
 * - 쿼리스트링/폼 파라미터: {@link ParameterFilter}
 * - JSON 본문 객체의 같은 이름 필드: {@link BodyAdvice}
 */
public final class CurrentUserBinding {

	private CurrentUserBinding() {
	}

	static final Set<String> MEMBER_FIELDS = Set.of("loginMemberNo", "memberNo", "writerNo");
	static final String COMPANY_FIELD = "companyNo";

	static String valueFor(String name, LoginUser user) {
		if (MEMBER_FIELDS.contains(name)) return user.memberNo();
		if (COMPANY_FIELD.equals(name)) return user.companyNo();
		return null;
	}

	/** 요청 파라미터 덮어쓰기 */
	public static class ParameterFilter extends OncePerRequestFilter {

		@Override
		protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
				throws ServletException, IOException {
			LoginUser user = CurrentUser.getOrNull();
			chain.doFilter(user == null ? request : new Wrapper(request, user), response);
		}

		static class Wrapper extends HttpServletRequestWrapper {
			private final LoginUser user;

			Wrapper(HttpServletRequest request, LoginUser user) {
				super(request);
				this.user = user;
			}

			@Override
			public String getParameter(String name) {
				String forced = valueFor(name, user);
				return forced != null ? forced : super.getParameter(name);
			}

			@Override
			public String[] getParameterValues(String name) {
				String forced = valueFor(name, user);
				return forced != null ? new String[] { forced } : super.getParameterValues(name);
			}

			@Override
			public Map<String, String[]> getParameterMap() {
				Map<String, String[]> map = new HashMap<>(super.getParameterMap());
				map.replaceAll((name, values) -> {
					String forced = valueFor(name, user);
					return forced != null ? new String[] { forced } : values;
				});
				return Collections.unmodifiableMap(map);
			}
		}
	}

	/** @RequestBody 객체 필드 덮어쓰기 */
	@ControllerAdvice
	public static class BodyAdvice extends RequestBodyAdviceAdapter {

		@Override
		public boolean supports(MethodParameter methodParameter, Type targetType,
				Class<? extends HttpMessageConverter<?>> converterType) {
			return true;
		}

		@Override
		public Object afterBodyRead(Object body, HttpInputMessage inputMessage, MethodParameter parameter,
				Type targetType, Class<? extends HttpMessageConverter<?>> converterType) {
			LoginUser user = CurrentUser.getOrNull();
			if (user == null || body == null || body instanceof Map || body.getClass().getName().startsWith("java.")) {
				return body;
			}
			ReflectionUtils.doWithFields(body.getClass(), field -> overwrite(body, field, user),
					field -> field.getType() == String.class && valueFor(field.getName(), user) != null);
			return body;
		}

		private void overwrite(Object body, Field field, LoginUser user) {
			ReflectionUtils.makeAccessible(field);
			ReflectionUtils.setField(field, body, valueFor(field.getName(), user));
		}

		@Override
		public HttpInputMessage beforeBodyRead(HttpInputMessage inputMessage, MethodParameter parameter,
				Type targetType, Class<? extends HttpMessageConverter<?>> converterType) throws IOException {
			return inputMessage;
		}
	}

}
