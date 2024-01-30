package com.groupworks.app.book.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.groupworks.app.organ.vo.OrganVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("book")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
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
	
    @PostMapping("insert")
    public ResponseEntity<?> applyReservation(@RequestBody BookVo bookVo) {
        try {
            int result = service.insert(bookVo);

            if(result == 1) {
                return ResponseEntity.ok(Map.of("message", "예약 신청 성공"));
            } else {
                // 구체적인 실패 원인을 기록
                log.error("예약 신청 처리 실패: 결과 코드 {}", result);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                     .body(Map.of("message", "예약 처리 중 문제 발생"));
            }
        } catch (Exception e) {
            // 예외의 상세 내용을 로그에 기록
            log.error("예약 신청 중 예외 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("message", "서버 내부 오류"));
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
            						@RequestParam(required = false) String endDate,
            						@RequestParam(value = "page", defaultValue = "1") int currentPage, 
	                                @RequestParam(value = "limit", defaultValue = "10") int boardLimit) {
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
	
	//수정(기존)
//	@PostMapping("edit")
//	public String edit(BookVo vo) throws Exception {
//		int result = service.edit(vo);
//		
//		if(result != 1) {
//			System.out.println("예약 수정 실패");
//			throw new Exception();
//		}
//		
//		return "redirect:/book/detail?bookNo=" + vo.getBookNo();
//	}
	//수정(지피티) / json형태 응답 반환
	@PostMapping("edit")
	public ResponseEntity<?> edit(@RequestBody BookVo vo) {
	    try {
	        int result = service.edit(vo);
	        if(result != 1) {
	            throw new Exception("예약 수정 실패");
	        }
	        System.out.println("수정 요청된 BookVo : " + vo);
	        return ResponseEntity.ok().body(Map.of("message", "예약 수정 성공"));
	    } catch(Exception e) {
	    	System.out.println("수정 중 오류 발생 : " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "예약 수정 실패"));
	    }
	}//edit
	
	//삭제(기존)
//	@DeleteMapping("delete")
//	public String delete(BookVo vo) throws Exception{
//		
//		System.out.println(vo);
//		int result = service.delete(vo);
//		
//		if(result != 1) {
//			throw new Exception();
//		}
//		return "redirect:/book/list";
//	}
	//삭제(gpt)
	@DeleteMapping("delete/{bookNo}")
	public ResponseEntity<?> delete(BookVo vo) {
	    try {
	        int result = service.delete(vo);
	        if(result != 1) {
	            throw new Exception("삭제 실패");
	        }
	        return ResponseEntity.ok().body(Map.of("message", "예약 삭제 성공"));
	    } catch(Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "예약 삭제 실패"));
	    }
	}
	
	
}//class
	
	
	
	
	
	
	
	
	
	
	
	
	
	
