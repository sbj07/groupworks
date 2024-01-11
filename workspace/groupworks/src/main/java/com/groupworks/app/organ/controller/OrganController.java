package com.groupworks.app.organ.controller;

import java.io.File;
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

import com.groupworks.app.notice.vo.NoticeVo;
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
		
		System.out.println("f : " + f.getOriginalFilename());
		
		String profile = saveFile(f);
		vo.setProfile(profile);
		
		int result = service.insert(vo);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	
	/**
	 * ������ ������ �����ϰ�, ���� ��ü ��θ� ������
	 * @param ���ϰ�ü 
	 * @param ���ϰ��
	 * @return ��������������(���ϰ��+���ϸ�)
	 * @throws Exception
	 * @throws  
	 */
	private String saveFile(MultipartFile f) throws Exception {
		String path = "C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp\\resources\\upload\\organ\\img";
		String originName = f.getOriginalFilename();
	
		File target = new File(path + originName);
		f.transferTo(target);
		
		return path + originName;
	}
	
	//��ü ��� ��ȸ(��ȣ)(������)
	@GetMapping("list")
	public Map<String, Object> list(Model model) {
		
		List<OrganVo> voList = service.list();
		
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		System.out.println(voList);
		return map;
	}//������
	
	
	
//	//��ü ��� ��ȸ(��ȣ)(������)
//	@GetMapping("rest/list")
//	@ResponseBody
//	public List<OrganVo> restList(){
//		List<OrganVo> voList = service.list();
//		
//		return voList;
//	}//������
	
	
	//�� ��ȸ(��ȣ)
	@GetMapping("detail")
	public String detail(OrganVo vo, Model model) {
		System.out.println(vo);
		OrganVo organVo = service.detail(vo);
		model.addAttribute("organVo", organVo);
		
		System.out.println("organVo : " + organVo);
		return "organ/detail";
	}//detail
	
	
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











