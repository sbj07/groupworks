package com.groupworks.app.notice.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.notice.dao.NoticeDao;
import com.groupworks.app.notice.vo.NoticeVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
	//ㅇㅇ

	private final NoticeDao dao;
	private final SqlSessionTemplate sst;
	
	//작성
	public int insert(NoticeVo vo) {
		
		return dao.insert(sst, vo);
	}

	//전체 목록 조회
	public List<NoticeVo> list() {

		return dao.list(sst);
	}

	//상세 조회
	public NoticeVo detail(NoticeVo vo) {

		return dao.detail(sst, vo);
	}

	//수정
	public int edit(NoticeVo vo) {

		return dao.edit(sst, vo);
	}

	//삭제
	public int delete(NoticeVo vo) {

		return dao.delete(sst, vo);
	}

	
	
	//삭제

}//class


















