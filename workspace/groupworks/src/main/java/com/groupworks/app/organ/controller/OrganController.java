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
	
	//����
	@PostMapping("insert")
	public String insert(OrganVo vo) throws Exception{
		
		int result = service.insert(vo);
		if(result != 1) {
			System.out.println("������ ���� ����");
			throw new Exception();
		}
		
		return "redirect:/organ/list";
	}
	
	
	//��ü ��� ��ȸ(��ȣ)(������)
	@GetMapping("list")
	public String list(Model model) {
		
		List<OrganVo> voList = service.list();
		model.addAttribute("organVoList", voList);
		
		return "organ/list";
	}//������
	
	//��ü ��� ��ȸ(��ȣ)(������)
	@GetMapping("rest/list")
	@ResponseBody
	public List<OrganVo> restList(){
		List<OrganVo> voList = service.list();
		
		return voList;
	}//������
	
	
	//����ȸ??
	
	
	//����
	@PostMapping("edit")
	public String edit(OrganVo vo) throws Exception{
		
		int result = service.edit(vo);
		if(result != 1) {
			System.out.println("������ ���� ����");
			throw new Exception();
		}
		return "redirect:/organ/list";
	}
	
	
	//����
	@PostMapping("delete")
	public String delete(OrganVo vo) throws Exception{
		int result = service.delete(vo);
		if(result != 1) {
			System.out.println("������ ���� ����");
			throw new Exception();
		}
		return "redirect:/organ/list";
	}
	
	
}//class











