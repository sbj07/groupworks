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

	public BusinessTripFormVo selectList(String no) {
		return dao.selectList(sst, no);
	}

	public boolean updateStatus(BusinessTripFormVo formVo) {
		int result = dao.updateStatus(sst, formVo);
        // 승인 상태 업데이트 후 다시 조회
		BusinessTripFormVo resultVo = selectList(formVo.getNo());
        // 모든 승인자가 승인했는지 확인
        if (resultVo.getFirstStatus().equals("2") &&
        		resultVo.getMidStatus().equals("2") &&
        		resultVo.getLastStatus().equals("2") ) {
        	return true;
        }
        else {
        	return false;
        }
	}

	public int endApply(BusinessTripFormVo vo) {
		return dao.endApply(sst, vo.getNo(), 2);
	}
	
	public boolean updateRejection(BusinessTripFormVo formVo) {
		int result = dao.updateRejection(sst, formVo);
		
		BusinessTripFormVo resultVo = selectList(formVo.getNo());
		
		if(resultVo.getFirstStatus().equals("3") ||
				resultVo.getMidStatus().equals("3") ||
				resultVo.getLastStatus().equals("3") ) {
			return true;
		}
		else {
			return false;
		}
	}

	public int endRejection(BusinessTripFormVo vo) {
		return dao.endRejection(sst, vo);
	}
	
	
}
