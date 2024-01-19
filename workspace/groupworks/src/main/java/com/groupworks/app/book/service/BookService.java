package com.groupworks.app.book.service;

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
		
		return dao.insert(sst, vo);
	}

	//목록 조회
	public List<BookVo> list() {

		return dao.list(sst);
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














