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
	
	//����
	public int insert(BookVo vo) {
		
		return dao.insert(sst, vo);
	}

	//��ü ��ȸ
	public List<BookVo> list() {

		return dao.list(sst);
	}

	//�� ��ȸ
	public BookVo detail(BookVo vo) {

		return dao.detail(sst, vo);
	}

	//����
	public int edit(BookVo vo) {
		
		if(vo == null) {
			throw new IllegalStateException("vo�� ��� ������Ʈ �Ұ���");
		}
		
		return dao.edit(sst, vo);
	
	}

	public int delete(BookVo vo) {

		return dao.delete(sst, vo);
	}
	
	//����

}//class














