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

	private final NoticeDao dao;
	private final SqlSessionTemplate sst;
	
	//작성	
	public int insert(NoticeVo vo) {
		
		String str = vo.getFilePath().replace("C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp", "http://127.0.0.1:8888/app");
		vo.setFilePath(str);
		
		if(vo.getTitle().length() < 1) {
			throw new IllegalStateException();
		}
		
		return dao.insert(sst, vo);
	}

	//목록 조회
//	public List<NoticeVo> list(String memberNo) {
//
//		return dao.list(sst, memberNo);
//	}

	//	public List<NoticeVo> list(String loginMember) {
//
//		return dao.list(sst, loginMember);
//	}
	
	public List<NoticeVo> list() {

		return dao.list(sst);
	}

	//상세조회 + 조회수 증가
	public NoticeVo detail(NoticeVo vo) {

		int result = dao.increaseHit(sst, vo);
		if(result != 1) {
			throw new IllegalStateException();
		}
		return dao.detail(sst, vo);
	}

	//수정
	public int edit(NoticeVo vo) {
		
		if(vo == null) {
			throw new IllegalStateException("vo가 없어서 업데이트 불가능");
		}
		if(vo.getTitle() != null && vo.getTitle().length() < 1) {
			throw new IllegalStateException();
		}

		return dao.edit(sst, vo);
	}

	//삭제
	public int delete(NoticeVo vo) {

		return dao.delete(sst, vo);
	}

}//class


















