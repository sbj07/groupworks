package com.groupworks.app.organ.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.groupworks.app.organ.service.OrganService;
import com.groupworks.app.organ.vo.OrganVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("organ")
@RequiredArgsConstructor
@CrossOrigin
public class OrganController {

	private final OrganService service;
	
	//생성
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
	 * 파일을 서버에 저장하고, 파일 전체 경로를 리턴함
	 * @param 파일객체 
	 * @param 파일경로
	 * @return 실제파일저장경로(파일경로+파일명)
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
	
	//전체 목록 조회(번호)(렌더링)
	@GetMapping("list")
	public Map<String, Object> list(Model model) {
		
//		System.out.println("listttt");
		
		List<OrganVo> voList = service.list();
		System.out.println(voList);
		
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		return map;
	}//렌더링
	
	
	
//	//전체 목록 조회(번호)(데이터)
//	@GetMapping("rest/list")
//	@ResponseBody
//	public List<OrganVo> restList(){
//		List<OrganVo> voList = service.list();
//		
//		return voList;
//	}//데이터
	
	
	//상세 조회(번호)
	@GetMapping("detail")
	public String detail(OrganVo vo, Model model) {
//		System.out.println(vo);
		OrganVo organVo = service.detail(vo);
		model.addAttribute("organVo", organVo);
		
		System.out.println("organVo : " + organVo);
		return "organ/detail";
	}//detail
	
	
	//수정
	@PostMapping("edit")
	public String edit(OrganVo vo) throws Exception{
		int result = service.edit(vo);
		if(result != 1) {
			System.out.println("조직도 수정 실패");
			throw new Exception();
		}
		return "redirect:/organ/list";
	}
	
	
	//삭제
	@PostMapping("delete")
	public String delete(OrganVo vo) throws Exception{
		int result = service.delete(vo);
		if(result != 1) {
			System.out.println("조직도 삭제 실패");
			throw new Exception();
		}
		return "redirect:/organ/list";
	}
	
	
}//class











