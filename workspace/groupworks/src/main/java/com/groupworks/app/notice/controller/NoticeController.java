package com.groupworks.app.notice.controller;

import java.io.File;
import java.io.IOException;
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

import com.groupworks.app.notice.service.NoticeService;
import com.groupworks.app.notice.vo.NoticeVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("notice")
@RequiredArgsConstructor
public class NoticeController {

	private final NoticeService service;
	
	//�ۼ�
	@PostMapping("insert")
	public Map<String, String> insert(NoticeVo vo, MultipartFile f) throws Exception{
		
		System.out.println("vo : " + vo);
		System.out.println("f : " + f.getOriginalFilename());
		
		String filePath = saveFile(f);
		vo.setFilePath(filePath);
		
		int result = service.insert(vo);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}//insert
	
	/**
	 * ������ ������ �����ϰ�, ���� ��ü ��θ� ������
	 * @param ���ϰ�ü 
	 * @param ���ϰ��
	 * @return ��������������(���ϰ��+���ϸ�)
	 * @throws Exception
	 * @throws  
	 */
	private String saveFile(MultipartFile f) throws Exception {
		String path = "C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp\\resources\\upload\\notice\\img";
		String originName = f.getOriginalFilename();
	
		File target = new File(path + originName);
		f.transferTo(target);
		
		return path + originName;
	}


	//��ü ��� ��ȸ(��ȣ)(������)?
	@GetMapping("list")
	public Map<String, Object> list(Model model, String memberNo) {
		

		List<NoticeVo> voList = service.list(memberNo);
		
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
//		map.put("voList", voList);
//		System.out.println("voList : " + voList);
		return map;
	}//������
	
//	//��ü ��� ��ȸ(��ȣ)(������)
//	@GetMapping("rest/list")
//	@ResponseBody
//	public List<NoticeVo> restList(){
//		List<NoticeVo> voList = service.list();
//		
//		return voList;
//	}//������
	
	
	//�� ��ȸ(��ȣ)
	@GetMapping("detail")
	public String detail(NoticeVo vo, Model model) {
		System.out.println(vo);
		NoticeVo noticeVo = service.detail(vo);
		model.addAttribute("noticeVo", noticeVo);
		
		System.out.println("noticeVo : " + noticeVo);
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























