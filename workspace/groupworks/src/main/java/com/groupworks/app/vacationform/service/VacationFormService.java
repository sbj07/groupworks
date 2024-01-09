package com.groupworks.app.vacationform.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.vacationform.dao.VacationFormDao;
import com.groupworks.app.vacationform.vo.VacationFormVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VacationFormService {
	
	private final VacationFormDao dao;
	private final SqlSessionTemplate sst;
	

	//휴가신청서 전체조회
	public List<VacationFormVo> list() {
		return dao.list(sst);
	}
	
	//결재대기 목록 조회
	public List<VacationFormVo> ingApprove() {
		return dao.ingApprove(sst);
	}
	
	//결재완료 목록 조회
	public List<VacationFormVo> edApprove() {
		return dao.edApprove(sst);
	}
	
	//휴가신청서 작성
	public int write(VacationFormVo vo) {
		return dao.write(sst, vo);
	}
	
	//휴가신청서 승인
	public int apply(VacationFormVo vo) {
		return dao.apply(sst, vo);
	}
	
	//휴가신청서 반려
	public int rejection(VacationFormVo vo) {
		return dao.rejection(sst, vo);
	}
	
	//휴가신청서 삭제
	public int delete(String no) {
		return dao.delete(sst, no);
	}
	
}
