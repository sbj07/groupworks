package com.groupworks.app.book.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.groupworks.app.book.service.BookService;
import com.groupworks.app.book.vo.BookVo;
import com.groupworks.app.notice.vo.NoticeVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("book")
@RequiredArgsConstructor
@CrossOrigin
public class BookController {
	
	private final BookService service;
	
	//예약(기존)
//	@PostMapping("insert")
//	public String insert(BookVo vo) throws Exception{
//		System.out.println(vo);
//		int result = service.insert(vo);
//		
//		if(result != 1) {
//			System.out.println("예약 실패");
//			throw new Exception();
//		}
//		return "redirect:/book/list";
//	}
	
    @PostMapping("apply")
    public ResponseEntity<?> applyReservation(@RequestBody BookVo bookVo) {
        try {
            int result = service.insert(bookVo);

            if(result == 1) {
                return ResponseEntity.ok(Map.of("message", "예약 신청 성공"));
            } else {
                throw new Exception("예약 신청 실패");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("message", "예약 신청 실패"));
        }
    }
	
	
//	//예약 목록 조회(번호)(렌더링)	//기존
//	@GetMapping("list")
//	public Map<String, Object> list(Model model) {
//		
//		List<BookVo> voList = service.list();
//		
//		Map<String, Object> map = new HashMap<>();
//		map.put("msg", "good");
//		map.put("voList", voList);
////		System.out.println("voList : " + voList);
//		return map;
//	}
	//예약 목록 조회(번호)(렌더링)
	@GetMapping("list")
	public Map<String, Object> list(@RequestParam(required = false) String startDate,
            						@RequestParam(required = false) String endDate) {
		List<BookVo> voList = service.listByDateRange(startDate, endDate);
		
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
//		System.out.println("voList : " + voList);
		return map;
	}
	
//	//예약 목록 조회(번호)(데이터)
//	@GetMapping("rest/list")
//	@ResponseBody
//	public List<NoticeVo> restList(){
//		List<NoticeVo> voList = service.list();
//		
//		return voList;
//	}
	
	
	//상세조회
	@GetMapping("detail")
	public String detail(BookVo vo, Model model) {
		
		BookVo bookVo = service.detail(vo);
		model.addAttribute("bookVo", bookVo);
		
//		System.out.println(bookVo);
		
		return "redirect:/book/list";
	}
	
	//수정
	@PostMapping("edit")
	public String edit(BookVo vo) throws Exception {
		int result = service.edit(vo);
		
		if(result != 1) {
			System.out.println("예약 수정 실패");
			throw new Exception();
		}
		
		return "redirect:/book/detail?bookNo=" + vo.getBookNo();
	}
	
	
	//삭제
	@PostMapping("delete")
	public String delete(BookVo vo) throws Exception{
		
		System.out.println(vo);
		int result = service.delete(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/book/list";
	}
	
	
}//class
	
	
	
	
	
	
	
	
	
	
	
	
	
	
