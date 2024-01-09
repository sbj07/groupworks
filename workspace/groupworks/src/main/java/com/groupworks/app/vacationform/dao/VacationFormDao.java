package com.groupworks.app.vacationform.dao;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.groupworks.app.vacationform.vo.VacationFormVo;

@Repository
public class VacationFormDao {

	//휴가신청서 전체조회
	public List<VacationFormVo> list(SqlSessionTemplate sst) {
		return sst.selectList("VacationFormMapper.list");
	}
	
	//결재대기 목록 조회
	public List<VacationFormVo> ingApprove(SqlSessionTemplate sst) {
		return sst.selectList("VacationFormMapper.selectIng");
	}
	
	//결재완료 목록 조회
	public List<VacationFormVo> edApprove(SqlSessionTemplate sst) {
		return sst.selectList("VacationFormMapper.selectEd");
	}
	
	//휴가신청서 작성
	public int write(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.insert("VacationFormMapper.insert");
	}
	
	//휴가신청서 승인
	public int apply(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.update("VacationFormMapper.apply", vo);
	}
	
	//휴가신청서 반려
	public int rejection(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.update("VacationFormMapper.rejection", vo);
	}
	
	//휴가신청서 삭제
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("VacationFormMapper.delete", no);
	}
}
