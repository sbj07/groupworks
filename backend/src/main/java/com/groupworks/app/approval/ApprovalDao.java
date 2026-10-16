package com.groupworks.app.approval;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApprovalDao {

	private static final String NS = "ApprovalMapper.";

	private final SqlSessionTemplate sst;

	private static Map<String, Object> params(DocType type, String no, String memberNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("type", type);
		map.put("docType", type.name());
		map.put("no", no);
		map.put("memberNo", memberNo);
		return map;
	}

	public List<MemberVo> approvers(String companyNo, String memberNo) {
		return sst.selectList(NS + "approvers", Map.of("companyNo", companyNo, "memberNo", memberNo));
	}

	public int insert(DocType type, ApprovalDocVo doc) {
		return sst.insert(NS + "insert", Map.of("type", type, "doc", doc));
	}

	public ApprovalDocVo detail(DocType type, String no) {
		return sst.selectOne(NS + "detail", params(type, no, null));
	}

	public int countMine(ApprovalSearchVo search) {
		return sst.selectOne(NS + "countMine", search);
	}

	public List<ApprovalDocVo> listMine(ApprovalSearchVo search) {
		return sst.selectList(NS + "listMine", search);
	}

	public int countPending(ApprovalSearchVo search) {
		return sst.selectOne(NS + "countPending", search);
	}

	public List<ApprovalDocVo> listPending(ApprovalSearchVo search) {
		return sst.selectList(NS + "listPending", search);
	}

	public List<Map<String, Object>> countMineByCategory(String memberNo) {
		return sst.selectList(NS + "countMineByCategory", Map.of("memberNo", memberNo));
	}

	public int updateMyStatus(DocType type, String no, String memberNo, int status) {
		Map<String, Object> map = params(type, no, memberNo);
		map.put("status", status);
		return sst.update(NS + "updateMyStatus", map);
	}

	public int completeIfAllApproved(DocType type, String no) {
		return sst.update(NS + "completeIfAllApproved", params(type, no, null));
	}

	public int reject(DocType type, String no, String rejection) {
		Map<String, Object> map = params(type, no, null);
		map.put("rejection", rejection);
		return sst.update(NS + "reject", map);
	}

	public int delete(DocType type, String no, String memberNo) {
		return sst.update(NS + "delete", params(type, no, memberNo));
	}

}
