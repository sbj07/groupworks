package com.groupworks.app.notice.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
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

import com.groupworks.app.company.vo.CompanyVo;
import com.groupworks.app.file.FileStorageService;
import com.groupworks.app.member.service.MemberService;
import com.groupworks.app.member.vo.DepartVo;
import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.notice.service.NoticeService;
import com.groupworks.app.notice.vo.CategoryVo;
import com.groupworks.app.notice.vo.NoticeSearchVo;
import com.groupworks.app.notice.vo.NoticeVo;
import com.groupworks.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("notice")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {

	private final NoticeService service;
	private final FileStorageService fileStorageService;

	// 작성(파일 업로드 추가)
	@PostMapping("insert")
	public ResponseEntity<Map<String, String>> insert(
			@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("title") String title,
			@RequestParam("content") String content, @RequestParam("memberNo") String memberNo,
			@RequestParam("category") String category, @RequestParam("openDepart") String openDepart) {
		Map<String, String> response = new HashMap<>();
		try {
			String filePath = null;
			if (file != null && !file.isEmpty()) {
				filePath = saveFile(file);
			}

			NoticeVo vo = new NoticeVo();
			vo.setTitle(title);
			vo.setContent(content);
			vo.setMemberNo(memberNo);
			vo.setFilePath(filePath);
			vo.setCategory(category);
			vo.setOpenDepart(openDepart);

			int result = service.insert(vo);
			response.put("msg", result == 1 ? "공지사항 추가 성공" : "공지사항 추가 실패");
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			response.put("msg", "서버 오류: " + e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private String saveFile(MultipartFile file) throws IOException {
		return fileStorageService.store(file, "notice/img");
	}

	// 공지사항 카테고리 데이터 가져오는 api
	@GetMapping("list/categoryList")
	public Map<String, Object> getCategoryList() {
		List<CategoryVo> categoryList = service.getCategoryList();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "okay");
		map.put("categories", categoryList);
		if (categoryList == null) {
			map.put("msg", "nope");
		}
		return map;
	}

	// 부서 데이터 가져오는 api
	@GetMapping("list/departList")
	public Map<String, Object> getDepartList() {
		List<DepartVo> departList = service.getDepartList();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "okay");
		map.put("list", departList);
		if (departList == null) {
			map.put("msg", "nope");
		}
		return map;
	}

	@GetMapping("list") // 조회조건 + 페이징처리
	public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") int currentPage,
			@RequestParam(value = "limit", defaultValue = "10") int boardLimit, @RequestParam String memberNo,
			NoticeSearchVo search) {

		search.setLoginMemberNo(memberNo);
		int listCount = service.getListCount(search); // 조회조건에 맞는 공지사항 수
		PageVo pageVo = new PageVo(listCount, currentPage, 10, boardLimit); // 페이지 정보 생성
		pageVo.setLoginMemberNo(memberNo);

		List<NoticeVo> voList = service.listPaged(pageVo, search); // 페이징 처리된 목록 조회

		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		map.put("pageInfo", pageVo); // 페이지 정보도 같이 반환
		map.put("totalCount", listCount);

		log.info("{}", map);
		return map;
	}

	// 상세 조회(번호)
	@GetMapping("detail")
	public String detail(NoticeVo vo, Model model) {
		System.out.println(vo);
		NoticeVo noticeVo = service.detail(vo);
		model.addAttribute("noticeVo", noticeVo);

		System.out.println("noticeVo : " + noticeVo);
		return "notice/detail";
	}// detail

	// 조회수 증가
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
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "조회수 증가 처리 실패, 확인 필요"));
			}
			return ResponseEntity.ok().body(Map.of("message", "조회수 증가 성공", "updatedVo", updatedVo));

		} catch (Exception e) {
//	    	e.printStackTrace();
			// 오류 발생 시
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "서버 오류 발생: " + e.getMessage()));
		}
	}

	// 수정(지피티) / json형태 응답 반환
	@PostMapping("edit")
	public ResponseEntity<?> edit(NoticeVo vo) {
		try {
			log.info("{}", vo);
			int result = service.edit(vo);
			if (result != 1) {
				throw new Exception("공지사항 수정 실패");
			}
			System.out.println("수정 요청된 NoticeVo : " + vo);
			return ResponseEntity.ok().body(Map.of("message", "공지사항 수정 성공"));
		} catch (Exception e) {
			System.out.println("수정 중 오류 발생 : " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "공지사항 수정 실패"));
		}
	}// edit

	// 삭제(gpt)
	@DeleteMapping("delete/{noticeNo}")
	public ResponseEntity<?> delete(NoticeVo vo, @RequestParam(value = "page", defaultValue = "1") int currentPage,
			@RequestParam(value = "limit", defaultValue = "10") int boardLimit, @RequestParam String memberNo) {
		try {
			int result = service.delete(vo);
			if (result != 1) {
				throw new Exception("삭제 실패");
			}

			NoticeSearchVo search = new NoticeSearchVo();
			search.setLoginMemberNo(memberNo);
			int listCount = service.getListCount(search); // 전체 공지사항 수를 다시 가져옵니다.
			PageVo pageVo = new PageVo(listCount, currentPage, 10, boardLimit); // 페이지 정보를 재생성합니다.
			List<NoticeVo> voList = service.listPaged(pageVo, search); // 새로운 목록 조회

			Map<String, Object> response = new HashMap<>();
			response.put("message", "공지사항 삭제 성공");
			response.put("voList", voList); // 새로운 목록
			response.put("pageInfo", pageVo); // 새로운 페이지 정보

			return ResponseEntity.ok().body(Map.of("message", "공지사항 삭제 성공"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "공지사항 삭제 실패"));
		}
	}

}// class
