package com.groupworks.app.notice.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.groupworks.app.notice.service.NoticeService;
import com.groupworks.app.notice.vo.NoticeVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("notice")
@RequiredArgsConstructor
public class NoticeController {

	//ㅇㅇ
	private final NoticeService service;
	
	//작성
	@PostMapping("insert")
	public String insert(NoticeVo vo) throws Exception{
		
		int result = service.insert(vo);
		
		if(result != 1) {
			System.out.println("공지사항 작성 실패");
			throw new Exception();
		}
		return "redirect:/notice/list";
	}//insert
	
	
	//전체 목록 조회(번호)(렌더링)
	@GetMapping("list")
	public String list(Model model) {
		
		List<NoticeVo> voList = service.list();
		model.addAttribute("noticeVoList", voList);
		
		return "notice/list";
	}//렌더링
	
	//전체 목록 조회(번호)(데이터)
	@GetMapping("rest/list")
	@ResponseBody
	public List<NoticeVo> restList(){
		List<NoticeVo> voList = service.list();
		
		return voList;
	}//데이터
	
	
	//상세 조회(번호)
	@GetMapping("detail")
	public String detail(NoticeVo vo, Model model) {
		NoticeVo noticeVo = service.detail(vo);
		model.addAttribute("noticeVo", noticeVo);
		
		return "notice/detail";
	}//detail
	
	
	//수정
	@PostMapping("edit")
	public String edit(NoticeVo vo) throws Exception{
		int result = service.edit(vo);
		
		if(result != 1) {
			System.out.println("공지사항 수정 실패");
			throw new Exception();
		}
		return "redirect:/notice/detail?noticeNo=" + vo.getNoticeNo();
	}//edit
	
	
	//삭제(번호)
	@PostMapping("delete")
	public String delete(NoticeVo vo) throws Exception{
		
		int result = service.delete(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/notice/list";
	}//delete
	
	
	
}//class























