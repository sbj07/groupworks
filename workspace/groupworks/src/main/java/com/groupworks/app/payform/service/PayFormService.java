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
	
	//������Ǽ� ��ü��ȸ
	public List<PayFormVo> list() {
		return dao.list(sst);
	}
	
	//������ ��� ��ȸ
	public List<PayFormVo> ingApprove() {
		return dao.ingApprove(sst);
	}
	
	//����Ϸ� ��� ��ȸ
	public List<PayFormVo> edApproved() {
		return dao.edApprove(sst);
	}
	
	//������Ǽ� �ۼ�
	public int write(PayFormVo vo) {
		return dao.write(sst, vo);
	}
	
	//������Ǽ� ����
	public int apply(PayFormVo vo) {
		return dao.apply(sst, vo);
	}
	
	//������Ǽ� �ݷ�
	public int rejection(PayFormVo vo) {
		return dao.rejection(sst, vo);
	}
	
	//������Ǽ� ����
	public int delete(String no) {
		return dao.delete(sst, no);
	}
}
