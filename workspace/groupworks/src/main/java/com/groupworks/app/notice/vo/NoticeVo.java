package com.groupworks.app.notice.vo;

import lombok.Data;

@Data
public class NoticeVo {

	private String notice_no;
	private String memberNo;
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
}
