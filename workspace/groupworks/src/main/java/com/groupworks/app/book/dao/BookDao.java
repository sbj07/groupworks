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

//	//목록 조회(기존)
//	public List<BookVo> list(SqlSessionTemplate sst) {
//
//		return sst.selectList("BookMapper.list");
//	}
	
	//목록조회(날짜 선택 안 했을 때 초기)
    public List<BookVo> list(SqlSessionTemplate sst) {
        return sst.selectList("BookMapper.list");
    }
    
	//목록 조회(gpt)
	public List<BookVo> listByDateRange(SqlSessionTemplate sst, String startDate, String endDate) {
	    Map<String, Object> params = new HashMap<>();
	    params.put("startDate", startDate);
	    params.put("endDate", endDate);
	    return sst.selectList("BookMapper.listByDateRange", params);
	}

	//상세 조회
	public BookVo detail(SqlSessionTemplate sst, BookVo vo) {

		return sst.selectOne("BookMapper.detail", vo);
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














