package com.groupworks.app.payform.dao;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.groupworks.app.payform.vo.PayFormVo;


@Repository
public class PayFormDao {

	//출장신청서 전체조회
	public List<PayFormVo> list(SqlSessionTemplate sst) {
		return sst.selectList("PayFormMapper.list");
	}
	
	//결재대기 목록 조회
	public List<PayFormVo> ingApprove(SqlSessionTemplate sst) {
		return sst.selectList("PayFormMapper.selectIng");
	}
	
	//결재완료 목록 조회
	public List<PayFormVo> edApprove(SqlSessionTemplate sst) {
		return sst.selectList("PayFormMapper.selectEd");
	}
	
	//출장신청서 작성
	public int write(SqlSessionTemplate sst, PayFormVo vo) {
		return sst.insert("PayFormMapper.insert");
	}
	
	//출장신청서 승인
	public int apply(SqlSessionTemplate sst, PayFormVo vo) {
		return sst.update("PayFormMapper.apply", vo);
	}
	
	//출장신청서 반려
	public int rejection(SqlSessionTemplate sst, PayFormVo vo) {
		return sst.update("PayFormMapper.rejection", vo);
	}
	
	//출장신청서 삭제
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("PayFormMapper.delete", no);
	}
}
