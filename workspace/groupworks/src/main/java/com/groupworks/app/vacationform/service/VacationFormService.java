package com.groupworks.app.vacationform.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.vacationform.dao.VacationFormDao;
import com.groupworks.app.vacationform.vo.VacationFormVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VacationFormService {
	
	private final VacationFormDao dao;
	private final SqlSessionTemplate sst;
	

	//�ް���û�� ��ü��ȸ
	public List<VacationFormVo> list(String writerNo) {
		return dao.list(sst, writerNo);
	}
	
	//������ ��� ��ȸ
	public List<VacationFormVo> ingApprove() {
		return dao.ingApprove(sst);
	}
	
	//����Ϸ� ��� ��ȸ
	public List<VacationFormVo> edApprove() {
		return dao.edApprove(sst);
	}
	
	//�ް���û�� �ۼ�
	public int write(VacationFormVo vo) {
		return dao.write(sst, vo);
	}
	
	//�ް���û�� ����
	public int apply(VacationFormVo vo) {
		return dao.apply(sst, vo);
	}
	
	//�ް���û�� �ݷ�
	public int rejection(VacationFormVo vo) {
		return dao.rejection(sst, vo);
	}
	
	//�ް���û�� ����
	public int delete(String no) {
		return dao.delete(sst, no);
	}

	public List<MemberVo> memberList(String companyNo) {
		return dao.memberList(sst, companyNo);
	}
	
}
