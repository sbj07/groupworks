package com.groupworks.app.book.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.book.vo.BookVo;

@Repository
public class BookDao {

	//����
	public int insert(SqlSessionTemplate sst, BookVo vo) {

		return sst.insert("BookMapper.insert", vo);
	}

	//��ü ��ȸ
	public List<BookVo> list(SqlSessionTemplate sst) {

		return sst.selectList("BookMapper.list");
	}

	//�� ��ȸ
	public BookVo detail(SqlSessionTemplate sst, BookVo vo) {

		return sst.selectOne("BookMapper.detail", vo);
	}

	//����
	public int edit(SqlSessionTemplate sst, BookVo vo) {

		return sst.update("BookMapper.edit", vo);
	}

	public int delete(SqlSessionTemplate sst, BookVo vo) {

		return sst.update("BookMapper.delete", vo);
	}
	

}














