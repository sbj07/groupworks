package com.groupworks.app.approval;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

/**
 * 전자결재 API (휴가신청서, 출장신청서 공통)
 * {type} 은 vacation 또는 business
 */
@RestController
@RequestMapping("api/approval")
@RequiredArgsConstructor
public class ApprovalController {

	private final ApprovalService service;

	private static Map<String, Object> okay(String message) {
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "okay");
		map.put("message", message);
		return map;
	}

	// 승인자 후보
	@GetMapping("approvers")
	public Map<String, Object> approvers() {
		Map<String, Object> map = okay(null);
		map.put("list", service.approvers());
		return map;
	}

	// 대시보드 건수
	@GetMapping("summary")
	public Map<String, Object> summary() {
		Map<String, Object> map = okay(null);
		map.putAll(service.summary());
		return map;
	}

	// 내 결재내역 (type, status 선택)
	@GetMapping("my")
	public Map<String, Object> my(@RequestParam(required = false) String type,
			@RequestParam(required = false) String status,
			@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int limit) {
		Map<String, Object> map = okay(null);
		map.putAll(service.listMine(type, status, Math.max(page, 1), Math.min(Math.max(limit, 1), 50)));
		return map;
	}

	// 승인대기 (내가 처리할 문서)
	@GetMapping("pending")
	public Map<String, Object> pending(@RequestParam(required = false) String type,
			@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int limit) {
		Map<String, Object> map = okay(null);
		map.putAll(service.listPending(type, Math.max(page, 1), Math.min(Math.max(limit, 1), 50)));
		return map;
	}

	// 작성
	@PostMapping("{type}")
	public Map<String, Object> write(@PathVariable String type, @RequestBody ApprovalDocVo doc) {
		DocType docType = DocType.of(type);
		service.write(docType, doc);
		return okay(docType.getLabel() + "를 결재 요청했습니다.");
	}

	// 문서 한 건
	@GetMapping("{type}/{no}")
	public Map<String, Object> detail(@PathVariable String type, @PathVariable String no) {
		Map<String, Object> map = okay(null);
		map.put("doc", service.detail(DocType.of(type), no));
		return map;
	}

	// 승인
	@PostMapping("{type}/{no}/approve")
	public Map<String, Object> approve(@PathVariable String type, @PathVariable String no) {
		boolean done = service.approve(DocType.of(type), no);
		Map<String, Object> map = okay(done ? "최종 승인되었습니다." : "승인했습니다. 다른 승인자의 결재를 기다립니다.");
		map.put("completed", done);
		return map;
	}

	// 반려
	@PostMapping("{type}/{no}/reject")
	public Map<String, Object> reject(@PathVariable String type, @PathVariable String no,
			@RequestBody Map<String, String> body) {
		service.reject(DocType.of(type), no, body.get("rejection"));
		return okay("반려했습니다.");
	}

	// 삭제 (작성자)
	@DeleteMapping("{type}/{no}")
	public Map<String, Object> delete(@PathVariable String type, @PathVariable String no) {
		service.delete(DocType.of(type), no);
		return okay("문서를 삭제했습니다.");
	}

}
