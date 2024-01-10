package com.groupworks.app.book.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.groupworks.app.book.service.BookService;
import com.groupworks.app.book.vo.BookVo;
import com.groupworks.app.notice.vo.NoticeVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("book")
@RequiredArgsConstructor
public class BookController {
	
	private final BookService service;
	
	//예약
	@PostMapping("insert")
	public String insert(BookVo vo) throws Exception{
		System.out.println(vo);
		int result = service.insert(vo);
		
		if(result != 1) {
			System.out.println("예약 실패");
			throw new Exception();
		}
		return "redirect:/book/list";
	}
	
	
	//전체조회(렌더링)
	@GetMapping("list")
	public Map<String, Object> list(Model model) {
		
		List<BookVo> voList = service.list();
		
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
//		System.out.println("voList : " + voList);
		return map;
	}
	
//	//전체 목록 조회(번호)(데이터)
//	@GetMapping("rest/list")
//	@ResponseBody
//	public List<NoticeVo> restList(){
//		List<NoticeVo> voList = service.list();
//		
//		return voList;
//	}//데이터
	
	
	//상세조회
	@GetMapping("detail")
	public String detail(BookVo vo, Model model) {
		
		BookVo bookVo = service.detail(vo);
		model.addAttribute("bookVo", bookVo);
		
//		System.out.println(bookVo);
		
		return "redirect:/book/list";
	}
	
	//변경
	@PostMapping("edit")
	public String edit(BookVo vo) throws Exception {
		int result = service.edit(vo);
		
		if(result != 1) {
			System.out.println("예약 변경 실패");
			throw new Exception();
		}
		
		return "redirect:/book/detail?bookNo=" + vo.getBookNo();
	}
	
	
	//삭제
	@PostMapping("delete")
	public String delete(BookVo vo) throws Exception{
		
		System.out.println(vo);
		int result = service.delete(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/book/list";
	}
	
	
}//class
	
	
	
	
	
	
	
	
	
	
	
	
	
	
