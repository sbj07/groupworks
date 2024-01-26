package com.groupworks.app.vacationform.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.page.vo.PageVo;
import com.groupworks.app.vacationform.dao.VacationFormDao;
import com.groupworks.app.vacationform.vo.VacationFormVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class VacationFormService {
	
	private final VacationFormDao dao;
	private final SqlSessionTemplate sst;
	

	public List<VacationFormVo> list(String writerNo) {
		return dao.list(sst, writerNo);
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
	
	public int delete(VacationFormVo vo) {
		return dao.delete(sst, vo);
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

	public List<VacationFormVo> applyListPage(PageVo pageVo) {
		return dao.applyListPage(sst, pageVo);
	}

	public int getApplyListCount(String loginMemberNo) {
		return dao.getApplyListCount(sst, loginMemberNo);
	}

	//휴가신청서 no로 정보 조회
	public VacationFormVo selectList(String no) {
		return dao.selectList(sst, no);
	}

	//승인했는지 안했는지 확인 로직
	public boolean updateStatus(VacationFormVo formVo) {

		int result = dao.updateStatus(sst, formVo);
        // 승인 상태 업데이트 후 다시 조회
        VacationFormVo resultVo = selectList(formVo.getNo());
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

	// 모든 승인 과정이 완료된 경우 휴가 신청서의 최종 상태를 '승인'으로 변경
	public int endApply(VacationFormVo vo) {
        return dao.endApply(sst, vo.getNo(), 2); // CATEGORY_NO를 '승인' 상태로 변경
	}

	public boolean updateRejection(VacationFormVo formVo) {
		int result = dao.updateRejection(sst, formVo);
		
		VacationFormVo resultVo = selectList(formVo.getNo());
		
		if(resultVo.getFirstStatus().equals("3") ||
				resultVo.getMidStatus().equals("3") ||
				resultVo.getLastStatus().equals("3") ) {
			return true;
		}
		else {
			return false;
		}
	}

	public int endRejection(VacationFormVo vo) {
		return dao.endRejection(sst, vo);
	}
}
