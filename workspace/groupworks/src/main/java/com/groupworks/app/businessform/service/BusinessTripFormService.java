package com.groupworks.app.businessform.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.businessform.dao.BusinessTripFormDao;
import com.groupworks.app.businessform.vo.BusinessTripFormVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusinessTripFormService {

	private final BusinessTripFormDao dao;
	private final SqlSessionTemplate sst;
	
	//출장신청서 전체조회
	public List<BusinessTripFormVo> list() {
		return dao.list(sst);
	}
	
	//결재대기 목록 조회
	public List<BusinessTripFormVo> ingApprove() {
		return dao.ingApprove(sst);
	}
	
	//결재완료 목록 조회
	public List<BusinessTripFormVo> edApprove() {
		return dao.edApprove(sst);
	}
	
	//출장신청서 작성
	public int write(BusinessTripFormVo vo) {
		return dao.write(sst, vo);
	}
	
	//출장신청서 승인
	public int apply(BusinessTripFormVo vo) {
		return dao.apply(sst, vo);
	}
	
	//출장신청서 반려
	public int rejection(BusinessTripFormVo vo) {
		return dao.rejection(sst, vo);
	}
	
	//출장신청서 삭제
	public int delete(String no) {
		return dao.delete(sst, no);
	}
}
