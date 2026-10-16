package com.groupworks.app.book.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.groupworks.app.book.service.BookService;
import com.groupworks.app.book.vo.BookVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("book")
@RequiredArgsConstructor
public class BookController {

	private final BookService service;

	private static Map<String, Object> okay(String message) {
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "okay");
		map.put("message", message);
		return map;
	}

	//예약 신청
	@PostMapping("insert")
	public Map<String, Object> applyReservation(@RequestBody BookVo bookVo) {
		service.insert(bookVo);
		return okay("예약을 신청했습니다.");
	}

	//예약 목록 (우리 회사, 조회조건)
	@GetMapping("list")
	public Map<String, Object> list(@RequestParam(required = false) String startDate,
									@RequestParam(required = false) String endDate,
									@RequestParam(required = false) String memberName,
									@RequestParam(required = false) String bookPlace,
									@RequestParam(required = false) String bookPurpose) {
		List<BookVo> voList = service.listByDateRange(startDate, endDate, memberName, bookPlace, bookPurpose);
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		return map;
	}

	//상세조회
	@GetMapping("detail/{bookNo}")
	public Map<String, Object> detail(@PathVariable String bookNo) {
		Map<String, Object> map = okay(null);
		map.put("bookVo", service.detail(bookNo));
		return map;
	}

	//수정 (본인)
	@PostMapping("edit")
	public Map<String, Object> edit(@RequestBody BookVo vo) {
		service.edit(vo);
		return okay("예약을 수정했습니다.");
	}

	//취소 (본인)
	@DeleteMapping("delete/{bookNo}")
	public Map<String, Object> delete(@PathVariable String bookNo) {
		BookVo vo = new BookVo();
		vo.setBookNo(bookNo);
		service.delete(vo);
		return okay("예약을 취소했습니다.");
	}

}//class
