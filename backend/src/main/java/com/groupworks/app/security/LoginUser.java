package com.groupworks.app.security;

/**
 * JWT 에서 꺼낸 로그인 사용자 정보.
 * 컨트롤러/서비스에서는 요청 파라미터 대신 이 값을 믿는다.
 */
public record LoginUser(String memberNo, String companyNo, String authNo, String name) {

	public static final String ADMIN_AUTH_NO = "1";

	public boolean isAdmin() {
		return ADMIN_AUTH_NO.equals(authNo);
	}

}
