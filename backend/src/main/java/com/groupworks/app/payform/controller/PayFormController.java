package com.groupworks.app.payform.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groupworks.app.payform.service.PayFormService;
import com.groupworks.app.payform.vo.PayFormVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/pay-form")
@RequiredArgsConstructor
public class PayFormController {

	private final PayFormService service;
	
	//지출결의서 조회
	@GetMapping("list")
	public Map<String, Object> list() {
		List<PayFormVo> payFormVoList = service.list();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("payFormVoList", payFormVoList);
		if(payFormVoList == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//결재대기 목록 조회
	@GetMapping("ing-approve")
	public Map<String, Object> ingApprove() {
		List<PayFormVo> ingList = service.ingApprove();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		if(ingList == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//결재완료 목록 조회
	@GetMapping("end-approve")
	public Map<String, Object> edApprove() {
		List<PayFormVo> edList = service.edApproved();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		if(edList == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//지출결의서 작성하기
	@PostMapping("write")
	public Map<String, String> write(PayFormVo vo) {
		int result = service.write(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//지출결의서 승인
	@PutMapping("apply")
	public Map<String, String> apply(PayFormVo vo) {
		int result = service.apply(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "put");
		}
		return map;
	}
	
	//지출결의서 반려
	@PutMapping("rejection")
	public Map<String, String> rejection(PayFormVo vo) {
		int result = service.write(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//지출결의서 삭제
	@DeleteMapping("delete")
	public Map<String, String> delete(String no) {
		int result = service.delete(no);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
}
