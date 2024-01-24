package com.groupworks.app.businessform.dao;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.groupworks.app.businessform.vo.BusinessTripFormVo;
import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.page.vo.PageVo;
import com.groupworks.app.vacationform.vo.VacationFormVo;

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
	public int delete(SqlSessionTemplate sst, BusinessTripFormVo vo) {
		return sst.update("BusinessTripFormMapper.delete", vo);
	}
	
	public List<MemberVo> memberList(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectList("BusinessTripFormMapper.member", vo);
	}

	public int getListCount(SqlSessionTemplate sst, String writerNo) {
		return sst.selectOne("BusinessTripFormMapper.getListCount", writerNo);
	}

	public List<BusinessTripFormVo> listPaged(SqlSessionTemplate sst, PageVo pageVo) {
		return sst.selectList("BusinessTripFormMapper.listPaged", pageVo);
	}

	public List<BusinessTripFormVo> applyList(SqlSessionTemplate sst, String loginMemberNo) {
		return sst.selectList("BusinessTripFormMapper.applyList", loginMemberNo);
	}

	public int getApplyListCount(SqlSessionTemplate sst, String loginMemberNo) {
		return sst.selectOne("BusinessTripFormMapper.getApplyListCount", loginMemberNo);
	}

	public List<VacationFormVo> applyListPage(SqlSessionTemplate sst, PageVo pageVo) {
		return sst.selectList("BusinessTripFormMapper.applyListPage", pageVo);
	}
	
}
