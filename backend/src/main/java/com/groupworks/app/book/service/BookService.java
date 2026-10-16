package com.groupworks.app.book.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.book.dao.BookDao;
import com.groupworks.app.book.vo.BookVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

	private final BookDao dao;
	private final SqlSessionTemplate sst;
	
	//예약
	public int insert(BookVo vo) {
	       DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

	        // startDate와 endDate 파싱
	    // 'T' 문자를 공백으로 대체하고 파싱
	        String formattedStartDate = vo.getStartDate().replace('T', ' ');
	        String formattedEndDate = vo.getEndDate().replace('T', ' ');
	        LocalDateTime startDate = LocalDateTime.parse(formattedStartDate, formatter);
	        LocalDateTime endDate = LocalDateTime.parse(formattedEndDate, formatter);
	        
	        // LocalDateTime을 String으로 변환하여 설정
	        vo.setStartDate(startDate.format(formatter));
	        vo.setEndDate(endDate.format(formatter));

	        return dao.insert(sst, vo);
	}



	//목록 조회(처음 /book/list 페이지 들어갈 때(날짜 선택 안 했을 때))
	public List<BookVo> list() {

		return dao.list(sst);
	}
	
	// 목록 조회(gpt)
//	public List<BookVo> listByDateRange(String startDate, String endDate) {
//	    return dao.listByDateRange(sst, startDate, endDate);
//	}
    // 조회조건은 모두 선택 사항이며, 비어 있으면 전체 목록
    public List<BookVo> listByDateRange(String startDate, String endDate, String memberName, String bookPlace, String bookPurpose) {
        return dao.listByDateRange(sst, toDate(startDate), toDate(endDate), memberName, bookPlace, bookPurpose);
    }//listByDateRange

    // yyyy-MM-dd 형식이 아니면 조건에서 뺀다
    private String toDate(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        try {
            return LocalDate.parse(value, DateTimeFormatter.ofPattern("yyyy-MM-dd")).toString();
        } catch (DateTimeParseException e) {
            return null;
        }
    }

	//상세 조회
	public BookVo detail(BookVo vo) {

		return dao.detail(sst, vo);
	}

	//수정
	public int edit(BookVo vo) {
		
		if(vo == null) {
			throw new IllegalStateException("vo가 없어서 업데이트 불가능");
		}
		
		return dao.edit(sst, vo);
	
	}
	
	//삭제
	public int delete(BookVo vo) {

		return dao.delete(sst, vo);
	}
	

}//class














