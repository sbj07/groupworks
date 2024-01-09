//package com.groupworks.app.book.controller;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PostMapping;
//
//import com.groupworks.app.book.service.BookService;
//import com.groupworks.app.book.vo.BookVo;
//
//@Controller
//public class BookController {
//	
//	private final BookService service;
//	
//	//예약
//	@PostMapping
//	public String insert(BookVo vo) throws Exception{
//		
//		int result = service.insert(vo);
//		if(result != 1) {
//			System.out.println("예약 실패");
//			throw new Exception();
//		}
//		return "redirect:/book/list";
//	}
//	
//	//전체조회
//	
//	//상세조회
//	
//	//변경
//	
//	//삭제
//}
