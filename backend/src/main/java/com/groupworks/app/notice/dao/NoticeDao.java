package com.groupworks.app.notice.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.member.vo.DepartVo;
import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.notice.vo.CategoryVo;
import com.groupworks.app.notice.vo.NoticeVo;
import com.groupworks.app.page.vo.PageVo;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class NoticeDao {
	
	//작성
	public int insert(SqlSessionTemplate sst, NoticeVo vo) {

		log.info("{}" + vo);
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

	//카테고리 가져오기
	public List<CategoryVo> getCategoryList(SqlSessionTemplate sst) {
	    return sst.selectList("NoticeMapper.getCategoryList");
	}

	//부서 가져오기
	public List<DepartVo> getDepartList(SqlSessionTemplate sst) {
	    return sst.selectList("NoticeMapper.getDepartList");
	}

	//기존 카테고리, 부서 가져오기
//	public String findCategoryNoByCon(SqlSessionTemplate sst, String categoryCon) {
//	    return sst.selectOne("NoticeMapper.findCategoryNoByCon", categoryCon);
//	}
//
//	public String findDepartNoByName(SqlSessionTemplate sst, String departName) {
//	    return sst.selectOne("NoticeMapper.findDepartNoByName", departName);
//	}
	
	//목록 조회
//	public List<NoticeVo> list(SqlSessionTemplate sst) {
//
//		return sst.selectList("NoticeMapper.list");
//	}
	public List<NoticeVo> list(SqlSessionTemplate sst) {

		return sst.selectList("NoticeMapper.list");
	}
	
	//목록 조회 페이징 기능(기존)
	public List<NoticeVo> listPaged(SqlSessionTemplate sst, PageVo pageVo) {
	    return sst.selectList("NoticeMapper.listPaged", pageVo);
	}
	//전체 수 조회(기존)
	public int getListCount(SqlSessionTemplate sst, String memberNo) {
	    return sst.selectOne("NoticeMapper.getListCount", memberNo);
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












