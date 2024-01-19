package com.groupworks.app.notice.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.notice.vo.NoticeVo;
import com.groupworks.app.page.vo.PageVo;

@Repository
public class NoticeDao {
	
	//작성
	public int insert(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.insert("NoticeMapper.insert", vo);
	}

	//목록 조회
//	public List<NoticeVo> list(SqlSessionTemplate sst, String memberNo) {
//
//		return sst.selectList("NoticeMapper.list", memberNo);
//	}

//	public List<NoticeVo> list(SqlSessionTemplate sst, String loginMember) {
//
//		return sst.selectList("NoticeMapper.list", loginMember);
//	}

	//목록 조회
	public List<NoticeVo> list(SqlSessionTemplate sst) {

		return sst.selectList("NoticeMapper.list");
	}
	
	//목록 조회 페이징 기능
	public List<NoticeVo> listPaged(SqlSessionTemplate sst, PageVo pageVo) {
	    return sst.selectList("NoticeMapper.listPaged", pageVo);
	}
	//전체 수 조회
	public int getListCount(SqlSessionTemplate sst) {
	    return sst.selectOne("NoticeMapper.getListCount");
	}

	//상세 조회
	public NoticeVo detail(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.selectOne("NoticeMapper.detail", vo);
	}
	
	//조회수 증가
	public int increaseHit(SqlSessionTemplate sst, NoticeVo vo) {
		return sst.update("NoticeMapper.increaseHit", vo);
	}

	//수정
	public int edit(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.update("NoticeMapper.edit", vo);
	}
	
	//삭제
	public int delete(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.delete("NoticeMapper.delete", vo);
	}


}//class












