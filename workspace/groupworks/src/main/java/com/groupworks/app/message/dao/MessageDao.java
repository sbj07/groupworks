package com.groupworks.app.message.dao;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.groupworks.app.message.vo.MessageVo;

@Repository
public class MessageDao {

	//보낸 쪽지 조회
	public List<MessageVo> sendList(SqlSessionTemplate sst, String memberNo) {
		return sst.selectList("MessageMapper.sendList", memberNo);
	}
	
	//받은 쪽지 조회
	public List<MessageVo> recieveList(SqlSessionTemplate sst, String memberNo) {
		return sst.selectList("MessageMapper.recieveList", memberNo);
	}
	
	//쪽지 보내기
	public int write(SqlSessionTemplate sst, MessageVo vo) {
		return sst.insert("MessageMapper.insert", vo);
	}
	
	//쪽지 답장
	public int reWrite(SqlSessionTemplate sst, MessageVo vo) {
		return sst.insert("MessageMapper.reInsert", vo);
	}
	
	//쪽지 삭제
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("MessageMapper.delete", no);
	}
	

}
