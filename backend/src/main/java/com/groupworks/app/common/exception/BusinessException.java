package com.groupworks.app.common.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

/**
 * 사용자에게 그대로 보여줘도 되는 업무 예외.
 * GlobalExceptionHandler 가 status 와 message 로 응답한다.
 */
@Getter
public class BusinessException extends RuntimeException {

	private final HttpStatus status;

	public BusinessException(String message) {
		this(HttpStatus.BAD_REQUEST, message);
	}

	public BusinessException(HttpStatus status, String message) {
		super(message);
		this.status = status;
	}

	public static BusinessException notFound(String message) {
		return new BusinessException(HttpStatus.NOT_FOUND, message);
	}

	public static BusinessException forbidden(String message) {
		return new BusinessException(HttpStatus.FORBIDDEN, message);
	}

}
