package com.groupworks.app.businessform.dao;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.groupworks.app.businessform.vo.BusinessTripFormVo;
import com.groupworks.app.member.vo.MemberVo;

@Repository
public class BusinessTripFormDao {

	//�����û�� ��ü��ȸ
	public List<BusinessTripFormVo> list(SqlSessionTemplate sst, String writerNo) {
		return sst.selectList("BusinessTripFormMapper.list", writerNo);
	}
	
	//������ ��� ��ȸ
	public List<BusinessTripFormVo> ingApprove(SqlSessionTemplate sst) {
		return sst.selectList("BusinessTripFormMapper.selectIng");
	}
	
	//����Ϸ� ��� ��ȸ
	public List<BusinessTripFormVo> edApprove(SqlSessionTemplate sst) {
		return sst.selectList("BusinessTripFormMapper.selectEd");
	}
	
	//�����û�� �ۼ�
	public int write(SqlSessionTemplate sst, BusinessTripFormVo vo) {
		return sst.insert("BusinessTripFormMapper.insert", vo);
	}
	
	//�����û�� ����
	public int apply(SqlSessionTemplate sst, BusinessTripFormVo vo) {
		return sst.update("BusinessTripFormMapper.apply", vo);
	}
	
	//�����û�� �ݷ�
	public int rejection(SqlSessionTemplate sst, BusinessTripFormVo vo) {
		return sst.update("BusinessTripFormMapper.rejection", vo);
	}
	
	//�����û�� ����
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("BusinessTripFormMapper.delete", no);
	}
	
	public List<MemberVo> memberList(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectList("BusinessTripFormMapper.member", vo);
	}
	
}
