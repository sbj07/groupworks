package com.groupworks.app.organ.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.groupworks.app.organ.service.OrganService;
import com.groupworks.app.organ.vo.OrganVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("organ")
@RequiredArgsConstructor
public class OrganController {

	private final OrganService service;
	
	//생성
	@PostMapping("insert")
	public String insert(OrganVo vo) throws Exception{
		
		int result = service.insert(vo);
		if(result != 1) {
			System.out.println("조직도 생성 실패");
			throw new Exception();
		}
		
		return "redirect:/organ/list";
	}
	
	
	//전체 목록 조회(번호)(렌더링)
	@GetMapping("list")
	public String list(Model model) {
		
		List<OrganVo> voList = service.list();
		model.addAttribute("organVoList", voList);
		
		return "organ/list";
	}//렌더링
	
	//전체 목록 조회(번호)(데이터)
	@GetMapping("rest/list")
	@ResponseBody
	public List<OrganVo> restList(){
		List<OrganVo> voList = service.list();
		
		return voList;
	}//데이터
	
	
	//상세조회??
	
	
	//수정
	@PostMapping("edit")
	public String edit(OrganVo vo) throws Exception{
		
		int result = service.edit(vo);
		if(result != 1) {
			System.out.println("조직도 수정 실패");
			throw new Exception();
		}
		return "redirect:/organ/list";
	}
	
	
	//삭제
	@PostMapping("delete")
	public String delete(OrganVo vo) throws Exception{
		int result = service.delete(vo);
		if(result != 1) {
			System.out.println("조직도 삭제 실패");
			throw new Exception();
		}
		return "redirect:/organ/list";
	}
	
	
}//class











