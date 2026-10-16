package com.groupworks.app.security;

import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.groupworks.app.common.exception.BusinessException;

/**
 * 현재 요청의 로그인 사용자 조회와 권한 확인 도우미
 */
public final class CurrentUser {

	private CurrentUser() {
	}

	/** 로그인하지 않았으면 null */
	public static LoginUser getOrNull() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null && auth.getPrincipal() instanceof LoginUser user) {
			return user;
		}
		return null;
	}

	public static LoginUser get() {
		LoginUser user = getOrNull();
		if (user == null) {
			throw new BusinessException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
		}
		return user;
	}

	public static String memberNo() {
		return get().memberNo();
	}

	public static String companyNo() {
		return get().companyNo();
	}

	/** 관리자만 */
	public static void requireAdmin() {
		if (!get().isAdmin()) {
			throw new BusinessException(HttpStatus.FORBIDDEN, "관리자만 할 수 있는 작업입니다.");
		}
	}

	/** 본인 또는 관리자만 */
	public static void requireSelfOrAdmin(String memberNo) {
		LoginUser user = get();
		if (!Objects.equals(user.memberNo(), memberNo) && !user.isAdmin()) {
			throw new BusinessException(HttpStatus.FORBIDDEN, "권한이 없습니다.");
		}
	}

	/** 같은 회사 데이터만 */
	public static void requireSameCompany(String companyNo) {
		if (!Objects.equals(companyNo(), companyNo)) {
			throw new BusinessException(HttpStatus.FORBIDDEN, "다른 회사의 정보에는 접근할 수 없습니다.");
		}
	}

}
