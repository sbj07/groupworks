package com.groupworks.app.notice.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.notice.service.NoticeService;
import com.groupworks.app.notice.vo.NoticeVo;
import com.groupworks.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("notice")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class NoticeController {

	private final NoticeService service;
	
//	//작성(파일 저장 기능 추가 전)
//	@PostMapping("insert")
//	public Map<String, String> insert(@RequestBody NoticeVo vo, MultipartFile f) throws Exception{
//		
////		System.out.println("vo : " + vo);
////	    if (f != null && !f.isEmpty()) {
////	        System.out.println("f : " + f.getOriginalFilename());
////	        String filePath = saveFile(f);
////	        vo.setFilePath(filePath);
////	    }
//		
//		
////		String filePath = saveFile(f);
////		vo.setFilePath(filePath);
////		
////		int result = service.insert(vo);
////		
////		Map<String, String> map = new HashMap<String, String>();
////		map.put("msg", "good");
////		
////		if(result != 1) {
////			map.put("msg", "bad");
////		}
////		return map;
//		
//	    System.out.println("vo : " + vo);
//	    if (f != null && !f.isEmpty()) {
//	        String filePath = saveFile(f);
//	        if (filePath != null) { // 파일 경로가 null이 아닌 경우에만 설정
//	            vo.setFilePath(filePath);
//	        }
//	    }
//        
//	    int result = service.insert(vo);
//	    
//	    Map<String, String> map = new HashMap<>();
//	    map.put("msg", result == 1 ? "good" : "bad");
//	    return map;
//
//	}//insert
	
	
	//작성(파일 업로드 추가)
	@PostMapping("insert")
	public ResponseEntity<Map<String, String>> insert(@RequestParam("file") MultipartFile file, 
	                                                  @ModelAttribute NoticeVo vo) {
	    Map<String, String> response = new HashMap<>();
	    try {
	        if (file != null && !file.isEmpty()) {
	            String filePath = saveFile(file);
	            if (filePath != null) { // 파일 경로가 null이 아닌 경우에만 설정
	                vo.setFilePath(filePath);
	            }
	        }
	        
	        int result = service.insert(vo);
	        response.put("msg", result == 1 ? "공지사항 추가 성공" : "공지사항 추가 실패");
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    } catch (Exception e) {
	        response.put("msg", "서버 오류: " + e.getMessage());
	        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	private String saveFile(MultipartFile file) throws IOException {
	    if (file.isEmpty()) {
	        return null;
	    }
	    String uploadDir = "C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp\\resources\\upload\\notice\\img"; // 업로드 디렉토리 경로를 설정합니다
	    Path uploadPath = Paths.get(uploadDir);

	    if (!Files.exists(uploadPath)) {
	        Files.createDirectories(uploadPath);
	    }

	    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	    Path filePath = uploadPath.resolve(fileName);
	    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

	    // 파일 접근 가능한 웹 URL 경로로 변환합니다.
	    // 예를 들어, 'resources/upload/notice/img' 디렉토리가 웹에서 접근 가능하도록 설정되어 있다면:
	    String fileAccessPath = "/resources/upload/notice/img/" + fileName;

	    return fileAccessPath;
	}

	
	
	/**
	 * 파일을 서버에 저장하고, 파일 전체 경로를 리턴함
	 * @param 파일객체 
	 * @param 파일경로
	 * @return 실제파일저장경로(파일경로+파일명)
	 * @throws Exception
	 * @throws  
	 */
	
	//기존 파일 저장 코드(수업)
	//	private String saveFile(MultipartFile f) throws Exception {
//	    if (f == null || f.isEmpty()) {
//	        return null; // 파일이 없으면 null을 반환
//	    }
//		String path = "C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp\\resources\\upload\\notice\\img";
//		String originName = f.getOriginalFilename();
//	
//		File target = new File(path + originName);
//		f.transferTo(target);
//		
//		return path + originName;
//	}


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
	    map.put("totalCount", listCount);
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
	
	//조회수 증가
	@PostMapping("/increase-click/{noticeNo}")
	public ResponseEntity<?> increaseClickCount(@PathVariable("noticeNo") String noticeNo) {
	    try {
	        // noticeNo를 사용하여 NoticeVo 객체 생성
	        NoticeVo vo = new NoticeVo();
	        vo.setNoticeNo(noticeNo);

	        // 서비스 레이어를 호출하여 조회수 증가 로직 수행
	        NoticeVo updatedVo = service.clickNo(vo);
	        log.info("{}" + updatedVo);
	        if (updatedVo == null) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "조회수 증가 처리 실패, 확인 필요"));
	        }
        	return ResponseEntity.ok().body(Map.of("message", "조회수 증가 성공", "updatedVo", updatedVo));
 
	    } catch (Exception e) {
//	    	e.printStackTrace();
	        // 오류 발생 시
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "서버 오류 발생: " + e.getMessage()));
	    }
	}
	//수정(기존)
//	@PostMapping("edit")
//	public String edit(NoticeVo vo) throws Exception{
//		try {
//			
//			int result = service.edit(vo);
//			
//			if(result != 1) {
//				System.out.println("공지사항 수정 실패");
//				throw new Exception("공지사항 수정 실패");
//			}
//		}catch(Exception e) {
//			e.printStackTrace();
//		}
////		return "redirect:/notice=" + vo.getNoticeNo();
//		return "redirect:/notice/list";
//	}//edit
	
	//수정(지피티) / json형태 응답 반환
	@PostMapping("edit")
	public ResponseEntity<?> edit(NoticeVo vo) {
	    try {
	        int result = service.edit(vo);
	        if(result != 1) {
	            throw new Exception("공지사항 수정 실패");
	        }
	        System.out.println("수정 요청된 NoticeVo : " + vo);
	        return ResponseEntity.ok().body(Map.of("message", "공지사항 수정 성공"));
	    } catch(Exception e) {
	    	System.out.println("수정 중 오류 발생 : " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "공지사항 수정 실패"));
	    }
	}//edit

	
	
	//삭제(번호)(기존)
//	@DeleteMapping("delete/{noticeNo}")
//	public String delete(NoticeVo vo) throws Exception{
//		
//		int result = service.delete(vo);
//		
//		if(result != 1) {
//			throw new Exception();
//		}
//		return "redirect:/notice/list";
//	}//delete
//	

	//삭제(gpt)
	@DeleteMapping("delete/{noticeNo}")
	public ResponseEntity<?> delete(NoticeVo vo) {
	    try {
	        int result = service.delete(vo);
	        if(result != 1) {
	            throw new Exception("삭제 실패");
	        }
	        return ResponseEntity.ok().body(Map.of("message", "공지사항 삭제 성공"));
	    } catch(Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "공지사항 삭제 실패"));
	    }
	}

}//class























