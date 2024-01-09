package com.groupworks.app.payform.dao;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.groupworks.app.payform.vo.PayFormVo;


@Repository
public class PayFormDao {

	//�����û�� ��ü��ȸ
	public List<PayFormVo> list(SqlSessionTemplate sst) {
		return sst.selectList("PayFormMapper.list");
	}
	
	//������ ��� ��ȸ
	public List<PayFormVo> ingApprove(SqlSessionTemplate sst) {
		return sst.selectList("PayFormMapper.selectIng");
	}
	
	//����Ϸ� ��� ��ȸ
	public List<PayFormVo> edApprove(SqlSessionTemplate sst) {
		return sst.selectList("PayFormMapper.selectEd");
	}
	
	//�����û�� �ۼ�
	public int write(SqlSessionTemplate sst, PayFormVo vo) {
		return sst.insert("PayFormMapper.insert");
	}
	
	//�����û�� ����
	public int apply(SqlSessionTemplate sst, PayFormVo vo) {
		return sst.update("PayFormMapper.apply", vo);
	}
	
	//�����û�� �ݷ�
	public int rejection(SqlSessionTemplate sst, PayFormVo vo) {
		return sst.update("PayFormMapper.rejection", vo);
	}
	
	//�����û�� ����
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("PayFormMapper.delete", no);
	}
}
