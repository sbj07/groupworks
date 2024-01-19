package com.groupworks.app.notice.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.groupworks.app.notice.service.NoticeService;
import com.groupworks.app.notice.vo.NoticeVo;
import com.groupworks.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("notice")
@RequiredArgsConstructor
@CrossOrigin
public class NoticeController {

	private final NoticeService service;
	
	//작성
	@PostMapping("insert")
	public Map<String, String> insert(NoticeVo vo, MultipartFile f) throws Exception{
		
//		System.out.println("vo : " + vo);
//	    if (f != null && !f.isEmpty()) {
//	        System.out.println("f : " + f.getOriginalFilename());
//	        String filePath = saveFile(f);
//	        vo.setFilePath(filePath);
//	    }
		
		
//		String filePath = saveFile(f);
//		vo.setFilePath(filePath);
//		
//		int result = service.insert(vo);
//		
//		Map<String, String> map = new HashMap<String, String>();
//		map.put("msg", "good");
//		
//		if(result != 1) {
//			map.put("msg", "bad");
//		}
//		return map;
	    System.out.println("vo : " + vo);
	    if (f != null && !f.isEmpty()) {
	        String filePath = saveFile(f);
	        if (filePath != null) { // 파일 경로가 null이 아닌 경우에만 설정
	            vo.setFilePath(filePath);
	        }
	    }
	    int result = service.insert(vo);
	    
	    Map<String, String> map = new HashMap<>();
	    map.put("msg", result == 1 ? "good" : "bad");
	    return map;

	}//insert
	
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
		String path = "C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp\\resources\\upload\\notice\\img";
		String originName = f.getOriginalFilename();
	
		File target = new File(path + originName);
		f.transferTo(target);
		
		return path + originName;
	}


//	//전체 목록 조회(번호)(렌더링)?  지섭 로그인멤버코드
//	@GetMapping("list")
//	public Map<String, Object> list(String loginMember) {
//		System.out.println("listeeee");
//		
//		List<NoticeVo> voList = service.list(loginMember);
//		System.out.println(voList);
//		
//		Map<String, Object> map = new HashMap<>();
//		map.put("msg", "good");
//		map.put("voList", voList);
////		System.out.println("voList : " + voList);
//		return map;
//	}//렌더링
	
	
	//전체 목록 조회(번호)(렌더링)?
//	@GetMapping("list")
//	public Map<String, Object> list() {
//		
//		List<NoticeVo> voList = service.list();
//		
//		Map<String, Object> map = new HashMap<>();
//		map.put("msg", "good");
//		map.put("voList", voList);
//		return map;
//	}//렌더링
	
	
	@GetMapping("list")	//페이징처리 gpt
	public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") int currentPage, 
	                                @RequestParam(value = "limit", defaultValue = "10") int boardLimit) {
	    int listCount = service.getListCount(); // 전체 공지사항 수를 가져옵니다.
	    PageVo pageVo = new PageVo(listCount, currentPage, 10, boardLimit); // 페이지 정보 생성

	    List<NoticeVo> voList = service.listPaged(pageVo); // 페이징 처리된 목록 조회

	    Map<String, Object> map = new HashMap<>();
	    map.put("msg", "good");
	    map.put("voList", voList);
	    map.put("pageInfo", pageVo); // 페이지 정보도 같이 반환
	    return map;
	}
	
	
//	//전체 목록 조회(번호)(데이터)
//	@GetMapping("rest/list")
//	@ResponseBody
//	public List<NoticeVo> restList(){
//		List<NoticeVo> voList = service.list();
//		
//		return voList;
//	}//데이터
	
	
	//상세 조회(번호)
	@GetMapping("detail")
	public String detail(NoticeVo vo, Model model) {
		System.out.println(vo);
		NoticeVo noticeVo = service.detail(vo);
		model.addAttribute("noticeVo", noticeVo);
		
		System.out.println("noticeVo : " + noticeVo);
		return "notice/detail";
	}//detail
	
	
	//수정
	@PostMapping("edit")
	public String edit(NoticeVo vo) throws Exception{
		int result = service.edit(vo);
		
		if(result != 1) {
			System.out.println("공지사항 수정 실패");
			throw new Exception();
		}
		return "redirect:/notice=" + vo.getNoticeNo();
	}//edit
	
	
	//삭제(번호)
	@PostMapping("delete")
	public String delete(NoticeVo vo) throws Exception{
		
		int result = service.delete(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/notice/list";
	}//delete
	
	
	
}//class























