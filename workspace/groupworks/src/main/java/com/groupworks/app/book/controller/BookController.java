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
	
	//����
	@PostMapping("insert")
	public String insert(BookVo vo) throws Exception{
		System.out.println(vo);
		int result = service.insert(vo);
		
		if(result != 1) {
			System.out.println("���� ����");
			throw new Exception();
		}
		return "redirect:/book/list";
	}
	
	
	//��ü��ȸ(������)
	@GetMapping("list")
	public Map<String, Object> list(Model model) {
		
		List<BookVo> voList = service.list();
		
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
//		System.out.println("voList : " + voList);
		return map;
	}
	
//	//��ü ��� ��ȸ(��ȣ)(������)
//	@GetMapping("rest/list")
//	@ResponseBody
//	public List<NoticeVo> restList(){
//		List<NoticeVo> voList = service.list();
//		
//		return voList;
//	}//������
	
	
	//����ȸ
	@GetMapping("detail")
	public String detail(BookVo vo, Model model) {
		
		BookVo bookVo = service.detail(vo);
		model.addAttribute("bookVo", bookVo);
		
//		System.out.println(bookVo);
		
		return "redirect:/book/list";
	}
	
	//����
	@PostMapping("edit")
	public String edit(BookVo vo) throws Exception {
		int result = service.edit(vo);
		
		if(result != 1) {
			System.out.println("���� ���� ����");
			throw new Exception();
		}
		
		return "redirect:/book/detail?bookNo=" + vo.getBookNo();
	}
	
	
	//����
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
