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
//	//����
//	@PostMapping
//	public String insert(BookVo vo) throws Exception{
//		
//		int result = service.insert(vo);
//		if(result != 1) {
//			System.out.println("���� ����");
//			throw new Exception();
//		}
//		return "redirect:/book/list";
//	}
//	
//	//��ü��ȸ
//	
//	//����ȸ
//	
//	//����
//	
//	//����
//}
