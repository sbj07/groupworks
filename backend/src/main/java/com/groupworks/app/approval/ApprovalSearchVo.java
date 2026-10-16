package com.groupworks.app.approval;

import lombok.Data;

/**
 * 결재 목록 조회 조건과 페이지
 */
@Data
public class ApprovalSearchVo {
	private String memberNo;       // 로그인한 사람 (작성자 또는 승인자)
	private String docType;        // VACATION / BUSINESS, 없으면 전체
	private String categoryNo;     // 1 진행중, 2 승인, 3 반려, 없으면 전체
	private int startRow;
	private int lastRow;
}
