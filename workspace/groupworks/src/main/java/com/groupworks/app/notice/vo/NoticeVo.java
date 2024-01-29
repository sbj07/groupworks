package com.groupworks.app.notice.vo;

import lombok.Data;

@Data
public class NoticeVo {

	private String noticeNo;
	private String memberNo;
	private String memberName;
	private String title;
	private String content;
	private String clickNo;
	private String filePath;
	private String category;
	private String emergencyYn;
	private String openDepart;
	private String enrollDate;
	private String updateDate;
	private String deleteYn;
	//카테고리테이블
	private String categoryCon;
	private String categoryNo;
	//부서테이블
	private String departNo;
	private String departName;
}
