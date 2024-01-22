package com.groupworks.app.vacationform.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.groupworks.app.member.service.MemberService;
import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.vacationform.service.VacationFormService;
import com.groupworks.app.vacationform.vo.VacationFormVo;

import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("api/vacation-form")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VacationFormController {

	private final VacationFormService service;
	private final MemberService memberService;
	
	//같은회사사람들 리스트 조회
	@GetMapping("member")
	public Map<String, Object> memberList(@ModelAttribute MemberVo vo) {
		List<MemberVo> memberList = service.memberList(vo);
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("memberList", memberList);
		if(memberList == null) {
			map.put("msg", "bad");
		}
		System.out.println(memberList);
		return map;
	}
	
	//로그인 유저 정보 조회
	@GetMapping("login-member")
	public Map<String, Object> getLoginMember(@RequestParam String no){
		MemberVo loginMember = memberService.getLoginMember(no);
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("loginMember", loginMember);
		if(loginMember == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//휴가신청서 조회
	@GetMapping("list")
	public Map<String, Object> list(@RequestParam String writerNo) {
		List<VacationFormVo> vacationVoList = service.list(writerNo);
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("vacationVoList", vacationVoList);
		if(vacationVoList == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//결재대기 목록 조회
	@GetMapping("ing-approve")
	public Map<String, Object> ingApprove() {
		List<VacationFormVo> ingList = service.ingApprove();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("ingList", ingList);
		if(ingList == null) {
			map.put("msg", "bad");
		}
		return map;	
	}
	
	//결재완료 목록 조회
	@GetMapping("end-approve")
	public Map<String, Object> edApprove() {
		List<VacationFormVo> edList = service.edApprove();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("edList", edList);
		if(edList == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//휴가신청서 작성
	@PostMapping("write")
	public Map<String, Object> write(@RequestBody VacationFormVo vo) {
		int result = service.write(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
			System.out.println(vo);
		}
		return map;
	}
	    
	//휴가신청서 승인
	@PutMapping("apply")
	public Map<String, String> apply(VacationFormVo vo) {
		int result = service.apply(vo);
		Map<String, String> map = new HashMap<>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//휴가신청서 반려
	@PutMapping("rejection")
	public Map<String, String> rejection(VacationFormVo vo) {
		int result = service.rejection(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//휴가신청서 삭제
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
