package com.groupworks.app.vacationform.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.page.vo.PageVo;
import com.groupworks.app.vacationform.vo.VacationFormVo;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class VacationFormDao {

	public List<VacationFormVo> list(SqlSessionTemplate sst, String writerNo) {
		return sst.selectList("VacationFormMapper.list", writerNo);
	}
	
	public int write(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.insert("VacationFormMapper.insert", vo);
	}
	
	public int apply(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.update("VacationFormMapper.apply", vo);
	}
	
	public int rejection(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.update("VacationFormMapper.rejection", vo);
	}
	
	public int delete(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.update("VacationFormMapper.delete", vo);
	}

	public List<MemberVo> memberList(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectList("VacationFormMapper.member", vo);
	}

	public int getListCount(SqlSessionTemplate sst, String writerNo) {
		return sst.selectOne("VacationFormMapper.getListCount", writerNo);
	}

	public List<VacationFormVo> listPaged(SqlSessionTemplate sst, PageVo pageVo) {
		return sst.selectList("VacationFormMapper.listPaged", pageVo);
	}

	public List<VacationFormVo> applyList(SqlSessionTemplate sst, String loginMemberNo) {
		return sst.selectList("VacationFormMapper.applyList", loginMemberNo);
	}

	public List<VacationFormVo> applyListPage(SqlSessionTemplate sst, PageVo pageVo) {
		return sst.selectList("VacationFormMapper.applyListPage", pageVo);
	}

	public int getApplyListCount(SqlSessionTemplate sst, String loginMemberNo) {
		return sst.selectOne("VacationFormMapper.getApplyListCount",loginMemberNo);
	}

	public VacationFormVo selectList(SqlSessionTemplate sst, String no) {
		return sst.selectOne("VacationFormMapper.selectList", no);
	}

	public int updateStatus(SqlSessionTemplate sst, VacationFormVo formVo) {
		return sst.update("VacationFormMapper.updateStatus", formVo);
	}

	public int endApply(SqlSessionTemplate sst, String no, int status) {
		return sst.update("VacationFormMapper.endApply", no);
	}

	public int updateRejection(SqlSessionTemplate sst, VacationFormVo formVo) {
		return sst.update("VacationFormMapper.updateRejection", formVo);
	}

	public int endRejection(SqlSessionTemplate sst, String no, int status) {
		return sst.update("VacationFormMapper.endRejection", no);
	}



}
