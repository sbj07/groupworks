package com.groupworks.app.vacationform.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.page.vo.PageVo;
import com.groupworks.app.vacationform.dao.VacationFormDao;
import com.groupworks.app.vacationform.vo.VacationFormVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VacationFormService {
	
	private final VacationFormDao dao;
	private final SqlSessionTemplate sst;
	

	public List<VacationFormVo> list(String writerNo) {
		return dao.list(sst, writerNo);
	}
	
	public List<VacationFormVo> ingApprove() {
		return dao.ingApprove(sst);
	}
	
	public List<VacationFormVo> edApprove() {
		return dao.edApprove(sst);
	}
	
	public int write(VacationFormVo vo) {
		return dao.write(sst, vo);
	}
	
	public int apply(VacationFormVo vo) {
		return dao.apply(sst, vo);
	}
	
	public int rejection(VacationFormVo vo) {
		return dao.rejection(sst, vo);
	}
	
	public int delete(String no) {
		return dao.delete(sst, no);
	}

	public List<MemberVo> memberList(MemberVo vo) {
		return dao.memberList(sst, vo);
	}

	public int getListCount(String writerNo) {
		return dao.getListCount(sst, writerNo);
	}

	public List<VacationFormVo> listPaged(PageVo pageVo) {
		return dao.listPaged(sst, pageVo);
	}

	public List<VacationFormVo> applyList(String loginMemberNo) {
		return dao.applyList(sst, loginMemberNo);
	}


}
