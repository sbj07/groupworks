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
import com.groupworks.app.page.vo.PageVo;
import com.groupworks.app.vacationform.service.VacationFormService;
import com.groupworks.app.vacationform.vo.VacationFormVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController 
@RequestMapping("api/vacation-form")
@RequiredArgsConstructor
@CrossOrigin("*")
@Slf4j
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
	
//	//휴가신청서 조회
//	@GetMapping("list")
//	public Map<String, Object> list(@RequestParam String writerNo) {
//		List<VacationFormVo> vacationVoList = service.list(writerNo);
//		Map<String, Object> map = new HashMap<>();
//		map.put("msg", "good");
//		map.put("vacationVoList", vacationVoList);
//		if(vacationVoList == null) {
//			map.put("msg", "bad");
//		}
//		return map;
//	}
	
	//승인자로 선택된 사람의 휴가신청서 리스트 조회 
	@GetMapping("apply-list")
	public Map<String, Object> applyList(@RequestParam String loginMemberNo, 
							             @RequestParam(value = "page", defaultValue = "1") int currentPage, 
							             @RequestParam(value = "limit", defaultValue = "10") int limit){
		int listCount = service.getApplyListCount(loginMemberNo);
	    PageVo pageVo = new PageVo(listCount, currentPage, 10, limit);
	    pageVo.setLoginMemberNo(loginMemberNo);
		
		List<VacationFormVo> applyVoList = service.applyListPage(pageVo);
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("applyVoList", applyVoList);
		map.put("pageInfo", pageVo);
		
		return map;
	}
	
	//조회
	@GetMapping("list")
	public Map<String, Object> list(@RequestParam String writerNo, 
	                                @RequestParam(value  = "page", defaultValue = "1") int currentPage, 
	                                @RequestParam(value = "limit", defaultValue = "10") int limit) {
	    int listCount = service.getListCount(writerNo);
	    PageVo pageVo = new PageVo(listCount, currentPage, 10, limit); // 페이지네이션 정보 계산
	    pageVo.setWriterNo(writerNo);
	    
	    List<VacationFormVo> vacationVoList = service.listPaged(pageVo);
	    Map<String, Object> map = new HashMap<>();
	    map.put("msg", "good");
	    map.put("vacationVoList", vacationVoList);
	    map.put("pageInfo", pageVo); // 페이지 정보 추가
	    
	    return map;
	}

	//휴가신청서 작성
	@PostMapping("write")
	public Map<String, Object> write(@RequestBody VacationFormVo vo) {
		log.info("vo : {}", vo);
		int result = service.write(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	    
	//휴가신청서 승인
	@PostMapping("apply")
	public Map<String, String> apply(@RequestBody VacationFormVo vo) {
		
		//휴가신청서 데이터 가져오기
		VacationFormVo formVo = service.selectList(vo.getNo());
		formVo.setLoginMemberNo(vo.getLoginMemberNo());
		
		//승인자 확인 및 업데이트
		boolean updateSuccess = service.updateStatus(formVo);
		Map<String, String> map = new HashMap<>();
		if(updateSuccess) {
			//모든 승인자가 승인한 경우, 휴가신청서 최종 업데이트
			int result = service.endApply(vo);
			if(result == 1) {
				map.put("msg", "good");
			} else {
				map.put("msg", "bad");
			}
		} else {
			map.put("msg", "bad");
		}
		
		return map;
	}
	
	//휴가신청서 반려
	@PostMapping("rejection")
	public Map<String, String> rejection(@RequestBody VacationFormVo vo) {
		
		int result = service.rejection(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//휴가신청서 삭
	@PostMapping("delete")
	public Map<String, String> delete(@RequestBody VacationFormVo vo) {
		int result = service.delete(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
}
