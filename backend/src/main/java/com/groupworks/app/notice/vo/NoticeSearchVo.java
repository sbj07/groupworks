package com.groupworks.app.notice.vo;

import lombok.Data;

/**
 * 공지사항 목록 조회조건
 */
@Data
public class NoticeSearchVo {
	private String loginMemberNo;
	// title, content, writer, 없으면 제목+내용
	private String searchType;
	private String keyword;
	private String category;
	private String emergencyYn;
	// yyyy-MM-dd
	private String startDate;
	private String endDate;
}
