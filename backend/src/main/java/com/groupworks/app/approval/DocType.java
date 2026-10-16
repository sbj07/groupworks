package com.groupworks.app.approval;

import java.util.Arrays;

import com.groupworks.app.common.exception.BusinessException;

/**
 * 결재 문서 종류. 문서마다 테이블만 다르고 구조는 같다.
 * table/sequence 는 SQL 에 ${} 로 들어가므로 사용자 입력이 아니라 이 enum 값만 쓴다.
 */
public enum DocType {

	VACATION("vacation", "휴가신청서", "VACATION_FORM", "SEQ_VACATION_FORM_NO"),
	BUSINESS("business", "출장신청서", "BUSINESS_TRIP_FORM", "SEQ_BUSINESS_TRIP_FORM_NO");

	private final String path;
	private final String label;
	private final String table;
	private final String sequence;

	DocType(String path, String label, String table, String sequence) {
		this.path = path;
		this.label = label;
		this.table = table;
		this.sequence = sequence;
	}

	public String getPath() {
		return path;
	}

	public String getLabel() {
		return label;
	}

	public String getTable() {
		return table;
	}

	public String getSequence() {
		return sequence;
	}

	/** 주소의 vacation / business 를 문서 종류로 */
	public static DocType of(String path) {
		return Arrays.stream(values())
				.filter(t -> t.path.equalsIgnoreCase(path) || t.name().equalsIgnoreCase(path))
				.findFirst()
				.orElseThrow(() -> BusinessException.notFound("없는 결재 문서 종류입니다."));
	}

}
