package com.groupworks.app.organ.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.groupworks.app.member.service.MemberService;
import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.notice.vo.NoticeVo;
import com.groupworks.app.organ.service.OrganService;
import com.groupworks.app.organ.vo.OrganVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("organ")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class OrganController {

	private final OrganService service;
	private final MemberService memberService;
	
	//생성
	@PostMapping("insert")
	public Map<String, String> insert(OrganVo vo, MultipartFile f) throws Exception{
		
		//기존
//		System.out.println("vo : " + vo);
//		
//		System.out.println("f : " + f.getOriginalFilename());
//		
//		String profile = saveFile(f);
//		vo.setProfile(profile);
//		
//		int result = service.insert(vo);
//		
//		Map<String, String> map = new HashMap<String, String>();
//		map.put("msg", "good");
//		
//		if(result != 1) {
//			map.put("msg", "bad");
//		}
		
		//수정(gpt)
	    System.out.println("vo : " + vo);
	    if (f != null && !f.isEmpty()) {
	        String profile = saveFile(f);
	        if (profile != null) { // 파일 경로가 null이 아닌 경우에만 설정
	            vo.setProfile(profile);
	        }
	    }
	    int result = service.insert(vo);
	    
	    Map<String, String> map = new HashMap<>();
	    map.put("msg", result == 1 ? "good" : "bad");
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
	    if (f == null || f.isEmpty()) {
	        return null; // 파일이 없으면 null을 반환
	    }
		String path = "C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp\\resources\\upload\\organ\\img";
		String originName = f.getOriginalFilename();
	
		File target = new File(path + originName);
		f.transferTo(target);
		
		return path + originName;
	}
	
	//전체 목록 조회(번호)(렌더링)
	@GetMapping("list")
	public Map<String, Object> list(String loginMemberNo) {
		
		MemberVo loginMember = memberService.getLoginMember(loginMemberNo);
		
		List<OrganVo> voList = service.list(loginMemberNo);
		
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
		
//		System.out.println("organVo : " + organVo);
		return "organ/detail";
	}//detail
	
	
	//수정(기존)
//	@PostMapping("edit")
//	public String edit(OrganVo vo) throws Exception{
//		int result = service.edit(vo);
//		if(result != 1) {
//			System.out.println("조직도 수정 실패");
//			throw new Exception();
//		}
//		return "redirect:/organ/list";
//	}
	//수정(gpt)
	@PostMapping("edit")
	public ResponseEntity<?> edit(OrganVo vo) {
	    try {
	        int result = service.edit(vo);
	        if(result != 1) {
	            throw new Exception("조직도 수정 실패");
	        }
	        System.out.println("수정 요청된 OrganVo : " + vo);
	        return ResponseEntity.ok().body(Map.of("message", "조직도 수정 성공"));
	    } catch(Exception e) {
	    	System.out.println("수정 중 오류 발생 : " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "조직도 수정 실패"));
	    }
	}//edit
	
	
	//삭제
//	@PostMapping("delete")
//	public String delete(OrganVo vo) throws Exception{
//		int result = service.delete(vo);
//		if(result != 1) {
//			System.out.println("조직도 삭제 실패");
//			throw new Exception();
//		}
//		return "redirect:/organ/list";
//	}
	
	//삭제(gpt)
//	@DeleteMapping("delete/{no}")
//	public ResponseEntity<?> delete(OrganVo vo) {
//	    try {
//	        int result = service.delete(vo);
//	        if(result != 1) {
//	            throw new Exception("삭제 실패");
//	        }
//	        return ResponseEntity.ok().body(Map.of("message", "조직도 삭제 성공"));
//	    } catch(Exception e) {
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "조직도 삭제 실패"));
//	    }
//	}
	@DeleteMapping("delete/{no}")
	public ResponseEntity<?> delete(@PathVariable String no) {
	    try {
	        int result = service.delete(no);
	        if(result != 1) {
	            throw new Exception("삭제 실패");
	        }
	        return ResponseEntity.ok().body(Map.of("message", "삭제 성공"));
	    } catch(Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "삭제 실패"));
	    }
	}

	
}//class











