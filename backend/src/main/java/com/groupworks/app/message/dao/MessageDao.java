package com.groupworks.app.message.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.message.vo.MessageVo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MessageDao {

	private static final String NS = "MessageMapper.";

	private final SqlSessionTemplate sst;

	// box: inbox(받은 쪽지) 또는 sent(보낸 쪽지)
	public List<MessageVo> list(String memberNo, String box) {
		return sst.selectList(NS + "list", Map.of("memberNo", memberNo, "box", box));
	}

	public int countSameCompanyMember(String memberNo, String companyNo) {
		return sst.selectOne(NS + "countSameCompanyMember", Map.of("memberNo", memberNo, "companyNo", companyNo));
	}

	// ownerNo 의 쪽지함에 한 줄 저장
	public int insert(MessageVo vo, String ownerNo) {
		return sst.insert(NS + "insert", Map.of("vo", vo, "ownerNo", ownerNo));
	}

	public int delete(String no, String memberNo) {
		return sst.update(NS + "delete", Map.of("no", no, "memberNo", memberNo));
	}

}
