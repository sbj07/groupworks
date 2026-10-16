package com.groupworks.app.book.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.book.vo.BookVo;

@Repository
public class BookDao {

	//예약
	public int insert(SqlSessionTemplate sst, BookVo vo) {
		return sst.insert("BookMapper.insert", vo);
	}

	//조회조건 목록 (회사별)
	public List<BookVo> listByDateRange(SqlSessionTemplate sst, String companyNo, String startDate, String endDate,
			String memberName, String bookPlace, String bookPurpose) {
	    Map<String, Object> params = new HashMap<>();
	    params.put("companyNo", companyNo);
	    params.put("startDate", startDate);
	    params.put("endDate", endDate);
	    params.put("memberName", memberName);
	    params.put("bookPlace", bookPlace);
	    params.put("bookPurpose", bookPurpose);
	    return sst.selectList("BookMapper.listByDateRange", params);
	}

	//상세 조회
	public BookVo detail(SqlSessionTemplate sst, String bookNo) {
		return sst.selectOne("BookMapper.detail", bookNo);
	}

	//예약의 회사 번호
	public String companyOfBook(SqlSessionTemplate sst, String bookNo) {
		return sst.selectOne("BookMapper.companyOfBook", bookNo);
	}

	//시간 겹치는 예약 수
	public int countOverlap(SqlSessionTemplate sst, String companyNo, BookVo vo) {
		Map<String, Object> params = new HashMap<>();
		params.put("companyNo", companyNo);
		params.put("bookPlace", vo.getBookPlace());
		params.put("startDate", vo.getStartDate());
		params.put("endDate", vo.getEndDate());
		params.put("bookNo", vo.getBookNo());
		return sst.selectOne("BookMapper.countOverlap", params);
	}

	//수정
	public int edit(SqlSessionTemplate sst, BookVo vo) {
		return sst.update("BookMapper.edit", vo);
	}

	//삭제
	public int delete(SqlSessionTemplate sst, BookVo vo) {
		return sst.update("BookMapper.delete", vo);
	}

}
