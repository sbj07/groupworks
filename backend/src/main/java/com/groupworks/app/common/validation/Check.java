package com.groupworks.app.common.validation;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.regex.Pattern;

import com.groupworks.app.common.exception.BusinessException;

/**
 * 입력값 검증 도우미. 조건에 맞지 않으면 사용자에게 보여줄 문구로 BusinessException(400) 을 던진다.
 * 화면에서 이미 검사하더라도 서버에서 한 번 더 확인한다.
 */
public final class Check {

	private static final Pattern EMAIL = Pattern.compile("^[\\w.+-]+@[\\w-]+(\\.[\\w-]+)*$");
	private static final Pattern TEL = Pattern.compile("^0\\d{8,10}$");
	private static final Pattern ID = Pattern.compile("^[A-Za-z0-9_]{4,20}$");

	private Check() {
	}

	/** 받침에 맞는 조사: josa("장소", "을", "를") → "장소를" */
	public static String josa(String word, String withBatchim, String withoutBatchim) {
		if (word == null || word.isEmpty()) return withoutBatchim;
		char last = word.charAt(word.length() - 1);
		boolean batchim = last >= 0xAC00 && last <= 0xD7A3 && (last - 0xAC00) % 28 != 0;
		return word + (batchim ? withBatchim : withoutBatchim);
	}

	public static boolean isBlank(String value) {
		return value == null || value.isBlank();
	}

	public static void that(boolean condition, String message) {
		if (!condition) {
			throw new BusinessException(message);
		}
	}

	public static void required(String value, String label) {
		that(!isBlank(value), josa(label, "을", "를") + " 입력해주세요.");
	}

	public static void maxLength(String value, int max, String label) {
		if (value != null) {
			that(value.length() <= max, josa(label, "은", "는") + " " + max + "자 이하로 입력해주세요.");
		}
	}

	public static void requiredMax(String value, int max, String label) {
		required(value, label);
		maxLength(value, max, label);
	}

	public static void memberId(String id) {
		required(id, "아이디");
		that(ID.matcher(id).matches(), "아이디는 영문, 숫자, _ 로 4~20자여야 합니다.");
	}

	public static void password(String pwd) {
		required(pwd, "비밀번호");
		that(pwd.length() >= 4 && pwd.length() <= 30, "비밀번호는 4~30자로 입력해주세요.");
	}

	public static void emailIfPresent(String email) {
		if (!isBlank(email)) {
			that(EMAIL.matcher(email).matches(), "이메일 형식이 올바르지 않습니다.");
		}
	}

	public static void telIfPresent(String tel) {
		if (!isBlank(tel)) {
			that(TEL.matcher(tel.replace("-", "")).matches(), "연락처는 숫자 9~11자리로 입력해주세요.");
		}
	}

	/** yyyy-MM-dd 날짜 */
	public static LocalDate date(String value, String label) {
		required(value, label);
		try {
			return LocalDate.parse(value.length() > 10 ? value.substring(0, 10) : value);
		} catch (DateTimeParseException e) {
			throw new BusinessException(label + " 형식이 올바르지 않습니다.");
		}
	}

	/** yyyy-MM-dd HH:mm 또는 yyyy-MM-ddTHH:mm 날짜시간 */
	public static LocalDateTime dateTime(String value, String label) {
		required(value, label);
		String normalized = value.replace('T', ' ');
		if (normalized.length() > 16) {
			normalized = normalized.substring(0, 16);
		}
		try {
			return LocalDateTime.parse(normalized, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
		} catch (DateTimeParseException e) {
			throw new BusinessException(label + " 형식이 올바르지 않습니다.");
		}
	}

	public static void dateOrder(LocalDate start, LocalDate end) {
		that(!end.isBefore(start), "종료일이 시작일보다 빠를 수 없습니다.");
	}

	public static void dateTimeOrder(LocalDateTime start, LocalDateTime end) {
		that(end.isAfter(start), "종료 시간은 시작 시간보다 늦어야 합니다.");
	}

	/** 수정/삭제 결과가 0건이면 대상이 없거나 권한이 없는 것 */
	public static void affected(int result, String message) {
		if (result < 1) {
			throw BusinessException.notFound(message);
		}
	}

}
