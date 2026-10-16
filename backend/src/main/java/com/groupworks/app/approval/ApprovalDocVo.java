package com.groupworks.app.approval;

import lombok.Data;

/**
 * 결재 문서 (휴가신청서, 출장신청서 공통)
 *
 * 상태값
 * - 문서(categoryNo): 1 진행중, 2 승인, 3 반려
 * - 승인자별(firstStatus 등): 1 대기, 2 승인, 3 반려
 */
@Data
public class ApprovalDocVo {
	private String docType;        // VACATION / BUSINESS
	private String no;

	private String writerNo;
	private String writerName;
	private String writerDepartName;
	private String writerPositionName;

	private String firstApplyNo;
	private String firstApplyName;
	private String firstStatus;
	private String midApplyNo;
	private String midApplyName;
	private String midStatus;
	private String lastApplyNo;
	private String lastApplyName;
	private String lastStatus;

	private String categoryNo;     // 문서 상태
	private String category;       // 문서 상태 이름
	private String vacationNo;     // 휴가 구분 (휴가신청서만)
	private String startTime;      // yyyy-MM-dd
	private String finishTime;     // yyyy-MM-dd
	private String content;
	private String writeDate;
	private String documentDate;
	private String rejection;
}
