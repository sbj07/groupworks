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
	
	//�����û�� ��ü��ȸ
	public List<BusinessTripFormVo> list() {
		return dao.list(sst);
	}
	
	//������ ��� ��ȸ
	public List<BusinessTripFormVo> ingApprove() {
		return dao.ingApprove(sst);
	}
	
	//����Ϸ� ��� ��ȸ
	public List<BusinessTripFormVo> edApprove() {
		return dao.edApprove(sst);
	}
	
	//�����û�� �ۼ�
	public int write(BusinessTripFormVo vo) {
		return dao.write(sst, vo);
	}
	
	//�����û�� ����
	public int apply(BusinessTripFormVo vo) {
		return dao.apply(sst, vo);
	}
	
	//�����û�� �ݷ�
	public int rejection(BusinessTripFormVo vo) {
		return dao.rejection(sst, vo);
	}
	
	//�����û�� ����
	public int delete(String no) {
		return dao.delete(sst, no);
	}
}
