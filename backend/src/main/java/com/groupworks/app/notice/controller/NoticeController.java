package com.groupworks.app.notice.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.groupworks.app.file.FileStorageService;
import com.groupworks.app.notice.service.NoticeService;
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

	private static Map<String, Object> okay(String message) {
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "okay");
		map.put("message", message);
		return map;
	}

	// 작성 (파일 첨부 선택)
	@PostMapping("insert")
	public Map<String, Object> insert(@RequestParam(value = "file", required = false) MultipartFile file,
			NoticeVo vo) throws IOException {
		vo.setFilePath(fileStorageService.store(file, "notice/img"));
		service.insert(vo);
		return okay("공지사항을 등록했습니다.");
	}

	// 공지사항 카테고리
	@GetMapping("list/categoryList")
	public Map<String, Object> getCategoryList() {
		Map<String, Object> map = okay(null);
		map.put("categories", service.getCategoryList());
		return map;
	}

	// 부서
	@GetMapping("list/departList")
	public Map<String, Object> getDepartList() {
		Map<String, Object> map = okay(null);
		map.put("list", service.getDepartList());
		return map;
	}

	// 조회조건 + 페이징 (로그인한 회사 공지만)
	@GetMapping("list")
	public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") int currentPage,
			@RequestParam(value = "limit", defaultValue = "10") int boardLimit, NoticeSearchVo search) {
		int listCount = service.getListCount(search);
		PageVo pageVo = new PageVo(listCount, Math.max(currentPage, 1), 10, Math.min(Math.max(boardLimit, 1), 100));
		List<NoticeVo> voList = service.listPaged(pageVo, search);

		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		map.put("pageInfo", pageVo);
		map.put("totalCount", listCount);
		return map;
	}

	// 상세 조회
	@GetMapping("detail/{noticeNo}")
	public Map<String, Object> detail(@PathVariable String noticeNo) {
		NoticeVo key = new NoticeVo();
		key.setNoticeNo(noticeNo);
		Map<String, Object> map = okay(null);
		map.put("noticeVo", service.detail(key));
		return map;
	}

	// 조회수 증가
	@PostMapping("/increase-click/{noticeNo}")
	public Map<String, Object> increaseClickCount(@PathVariable("noticeNo") String noticeNo) {
		NoticeVo vo = new NoticeVo();
		vo.setNoticeNo(noticeNo);
		Map<String, Object> map = okay("조회수 증가 성공");
		map.put("updatedVo", service.clickNo(vo));
		return map;
	}

	// 수정 (작성자만, 파일을 새로 올리면 교체)
	@PostMapping("edit")
	public Map<String, Object> edit(@RequestParam(value = "file", required = false) MultipartFile file, NoticeVo vo)
			throws IOException {
		String filePath = fileStorageService.store(file, "notice/img");
		if (filePath != null) {
			vo.setFilePath(filePath);
		}
		service.edit(vo);
		return okay("공지사항을 수정했습니다.");
	}

	// 삭제 (작성자 또는 관리자)
	@DeleteMapping("delete/{noticeNo}")
	public Map<String, Object> delete(@PathVariable String noticeNo) {
		NoticeVo vo = new NoticeVo();
		vo.setNoticeNo(noticeNo);
		service.delete(vo);
		return okay("공지사항을 삭제했습니다.");
	}

}// class
