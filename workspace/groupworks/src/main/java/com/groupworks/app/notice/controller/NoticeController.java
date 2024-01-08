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

	//����
	private final NoticeService service;
	
	//�ۼ�
	@PostMapping("insert")
	public String insert(NoticeVo vo) throws Exception{
		
		int result = service.insert(vo);
		
		if(result != 1) {
			System.out.println("�������� �ۼ� ����");
			throw new Exception();
		}
		return "redirect:/notice/list";
	}//insert
	
	
	//��ü ��� ��ȸ(��ȣ)(������)
	@GetMapping("list")
	public String list(Model model) {
		
		List<NoticeVo> voList = service.list();
		model.addAttribute("noticeVoList", voList);
		
		return "notice/list";
	}//������
	
	//��ü ��� ��ȸ(��ȣ)(������)
	@GetMapping("rest/list")
	@ResponseBody
	public List<NoticeVo> restList(){
		List<NoticeVo> voList = service.list();
		
		return voList;
	}//������
	
	
	//�� ��ȸ(��ȣ)
	@GetMapping("detail")
	public String detail(NoticeVo vo, Model model) {
		NoticeVo noticeVo = service.detail(vo);
		model.addAttribute("noticeVo", noticeVo);
		
		return "notice/detail";
	}//detail
	
	
	//����
	@PostMapping("edit")
	public String edit(NoticeVo vo) throws Exception{
		int result = service.edit(vo);
		
		if(result != 1) {
			System.out.println("�������� ���� ����");
			throw new Exception();
		}
		return "redirect:/notice/detail?noticeNo=" + vo.getNoticeNo();
	}//edit
	
	
	//����(��ȣ)
	@PostMapping("delete")
	public String delete(NoticeVo vo) throws Exception{
		
		int result = service.delete(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/notice/list";
	}//delete
	
	
	
}//class























