package com.groupworks.app.organ.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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
	public Map<String, String> insert(OrganVo vo, MultipartFile f) throws Exception{
		
		System.out.println("vo : " + vo);
		
		int result = service.insert(vo);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
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











