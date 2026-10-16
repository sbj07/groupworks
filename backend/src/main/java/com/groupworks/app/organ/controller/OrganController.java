package com.groupworks.app.organ.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groupworks.app.organ.service.OrganService;

import lombok.RequiredArgsConstructor;

/**
 * 조직도 (조회 전용). 구성원 추가/수정/삭제는 인사관리 > 인원관리(api/member)에서 한다.
 */
@RestController
@RequestMapping("organ")
@RequiredArgsConstructor
public class OrganController {

	private final OrganService service;

	// 우리 회사 구성원 목록
	@GetMapping("list")
	public Map<String, Object> list() {
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "okay");
		map.put("voList", service.list());
		return map;
	}

}
