package com.groupworks.app.vacationform.dao;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.groupworks.app.vacationform.vo.VacationFormVo;

@Repository
public class VacationFormDao {

	//�ް���û�� ��ü��ȸ
	public List<VacationFormVo> list(SqlSessionTemplate sst) {
		return sst.selectList("VacationFormMapper.list");
	}
	
	//������ ��� ��ȸ
	public List<VacationFormVo> ingApprove(SqlSessionTemplate sst) {
		return sst.selectList("VacationFormMapper.selectIng");
	}
	
	//����Ϸ� ��� ��ȸ
	public List<VacationFormVo> edApprove(SqlSessionTemplate sst) {
		return sst.selectList("VacationFormMapper.selectEd");
	}
	
	//�ް���û�� �ۼ�
	public int write(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.insert("VacationFormMapper.insert");
	}
	
	//�ް���û�� ����
	public int apply(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.update("VacationFormMapper.apply", vo);
	}
	
	//�ް���û�� �ݷ�
	public int rejection(SqlSessionTemplate sst, VacationFormVo vo) {
		return sst.update("VacationFormMapper.rejection", vo);
	}
	
	//�ް���û�� ����
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("VacationFormMapper.delete", no);
	}
}