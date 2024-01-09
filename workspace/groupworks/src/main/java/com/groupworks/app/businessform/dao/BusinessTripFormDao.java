package com.groupworks.app.businessform.dao;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.groupworks.app.businessform.vo.BusinessTripFormVo;

@Repository
public class BusinessTripFormDao {

	//출장신청서 전체조회
	public List<BusinessTripFormVo> list(SqlSessionTemplate sst) {
		return sst.selectList("BusinessTripFormMapper.list");
	}
	
	//결재대기 목록 조회
	public List<BusinessTripFormVo> ingApprove(SqlSessionTemplate sst) {
		return sst.selectList("BusinessTripFormMapper.selectIng");
	}
	
	//결재완료 목록 조회
	public List<BusinessTripFormVo> edApprove(SqlSessionTemplate sst) {
		return sst.selectList("BusinessTripFormMapper.selectEd");
	}
	
	//출장신청서 작성
	public int write(SqlSessionTemplate sst, BusinessTripFormVo vo) {
		return sst.insert("BusinessTripFormMapper.insert");
	}
	
	//출장신청서 승인
	public int apply(SqlSessionTemplate sst, BusinessTripFormVo vo) {
		return sst.update("BusinessTripFormMapper.apply", vo);
	}
	
	//출장신청서 반려
	public int rejection(SqlSessionTemplate sst, BusinessTripFormVo vo) {
		return sst.update("BusinessTripFormMapper.rejection", vo);
	}
	
	//출장신청서 삭제
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("BusinessTripFormMapper.delete", no);
	}
	
}
