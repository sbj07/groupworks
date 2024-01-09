package com.groupworks.app.payform.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import com.groupworks.app.payform.dao.PayFormDao;
import com.groupworks.app.payform.vo.PayFormVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PayFormService {

	
	private final PayFormDao dao;
	private final SqlSessionTemplate sst;
	
	//지출결의서 전체조회
	public List<PayFormVo> list() {
		return dao.list(sst);
	}
	
	//결재대기 목록 조회
	public List<PayFormVo> ingApprove() {
		return dao.ingApprove(sst);
	}
	
	//결재완료 목록 조회
	public List<PayFormVo> edApproved() {
		return dao.edApprove(sst);
	}
	
	//지출결의서 작성
	public int write(PayFormVo vo) {
		return dao.write(sst, vo);
	}
	
	//지출결의서 승인
	public int apply(PayFormVo vo) {
		return dao.apply(sst, vo);
	}
	
	//지출결의서 반려
	public int rejection(PayFormVo vo) {
		return dao.rejection(sst, vo);
	}
	
	//지출결의서 삭제
	public int delete(String no) {
		return dao.delete(sst, no);
	}
}
