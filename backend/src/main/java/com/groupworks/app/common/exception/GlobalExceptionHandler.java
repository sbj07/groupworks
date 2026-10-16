package com.groupworks.app.common.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import lombok.extern.slf4j.Slf4j;

/**
 * 모든 API 예외를 같은 형식으로 응답한다.
 * { "msg": "nope", "message": "사용자에게 보여줄 문구" }
 * (기존 화면이 msg 값으로 성공/실패를 판단하므로 msg 를 유지한다)
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	public static Map<String, Object> body(String message) {
		return Map.of("msg", "nope", "message", message);
	}

	private ResponseEntity<Map<String, Object>> respond(HttpStatus status, String message) {
		return ResponseEntity.status(status).body(body(message));
	}

	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<Map<String, Object>> handleBusiness(BusinessException e) {
		return respond(e.getStatus(), e.getMessage());
	}

	// 기존 서비스 코드에서 입력 오류를 IllegalStateException/IllegalArgumentException 으로 던진다
	@ExceptionHandler({ IllegalStateException.class, IllegalArgumentException.class })
	public ResponseEntity<Map<String, Object>> handleIllegal(RuntimeException e) {
		String message = e.getMessage() == null || e.getMessage().isBlank() ? "요청을 처리할 수 없습니다." : e.getMessage();
		return respond(HttpStatus.BAD_REQUEST, message);
	}

	@ExceptionHandler({ MissingServletRequestParameterException.class, MethodArgumentTypeMismatchException.class,
			HttpMessageNotReadableException.class })
	public ResponseEntity<Map<String, Object>> handleBadRequest(Exception e) {
		return respond(HttpStatus.BAD_REQUEST, "요청 값이 올바르지 않습니다.");
	}

	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<Map<String, Object>> handleUploadSize(MaxUploadSizeExceededException e) {
		return respond(HttpStatus.PAYLOAD_TOO_LARGE, "첨부파일은 5MB 이하만 올릴 수 있습니다.");
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<Map<String, Object>> handleAccessDenied(AccessDeniedException e) {
		return respond(HttpStatus.FORBIDDEN, "권한이 없습니다.");
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<Map<String, Object>> handleMethod(HttpRequestMethodNotSupportedException e) {
		return respond(HttpStatus.METHOD_NOT_ALLOWED, "지원하지 않는 요청입니다.");
	}

	@ExceptionHandler(NoResourceFoundException.class)
	public ResponseEntity<Map<String, Object>> handleNotFound(NoResourceFoundException e) {
		return respond(HttpStatus.NOT_FOUND, "요청한 주소를 찾을 수 없습니다.");
	}

	// 그 밖의 예외는 내부 내용을 숨기고 로그만 남긴다
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, Object>> handleUnknown(Exception e) {
		log.error("처리하지 못한 예외", e);
		return respond(HttpStatus.INTERNAL_SERVER_ERROR, "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
	}

}
