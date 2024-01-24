package com.groupworks.app.businessform.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.businessform.dao.BusinessTripFormDao;
import com.groupworks.app.businessform.vo.BusinessTripFormVo;
import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.page.vo.PageVo;
import com.groupworks.app.vacationform.vo.VacationFormVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusinessTripFormService {

	private final BusinessTripFormDao dao;
	private final SqlSessionTemplate sst;
	
	public List<BusinessTripFormVo> list(String writerNo) {
		return dao.list(sst, writerNo);
	}
	
	public List<BusinessTripFormVo> ingApprove() {
		return dao.ingApprove(sst);
	}
	
	public List<BusinessTripFormVo> edApprove() {
		return dao.edApprove(sst);
	}
	
	public int write(BusinessTripFormVo vo) {
		return dao.write(sst, vo);
	}
	
	public int apply(BusinessTripFormVo vo) {
		return dao.apply(sst, vo);
	}
	
	public int rejection(BusinessTripFormVo vo) {
		return dao.rejection(sst, vo);
	}
	
	public int delete(BusinessTripFormVo vo) {
		return dao.delete(sst, vo);
	}
	
	public List<MemberVo> memberList(MemberVo vo) {
		return dao.memberList(sst, vo);
	}

	public int getListCount(String writerNo) {
		return dao.getListCount(sst, writerNo);
	}

	public List<BusinessTripFormVo> listPaged(PageVo pageVo) {
		return dao.listPaged(sst, pageVo);
	}

	public List<BusinessTripFormVo> applyList(String loginMemberNo){
		return dao.applyList(sst, loginMemberNo);
	}
	
	public int getApplyListCount(String loginMemberNo) {
		return dao.getApplyListCount(sst, loginMemberNo);
	}

	public List<VacationFormVo> applyListPage(PageVo pageVo) {
		return dao.applyListPage(sst, pageVo);
	}
}
