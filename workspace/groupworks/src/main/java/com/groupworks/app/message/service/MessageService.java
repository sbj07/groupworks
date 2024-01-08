package com.groupworks.app.message.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.message.dao.MessageDao;
import com.groupworks.app.message.vo.MessageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

	private final MessageDao dao;
	private final SqlSessionTemplate sst; 
	
	//보낸쪽지조회
	public List<MessageVo> sendList(String memberNo) {
		return dao.sendList(sst, memberNo); 
	}

	//받은쪽지조회
	public List<MessageVo> recieveList(String memberNo){
		return dao.recieveList(sst, memberNo);
	}
	
	//쪽지보내기
	public int write(MessageVo vo) {
		return dao.write(sst, vo);
	}
	
	//쪽지답장
	public int reWrite(MessageVo vo) {
		return dao.reWrite(sst, vo);
	}
	
	//쪽지삭제
	public int delete(String no) {
		return dao.delete(sst, no);
	}
	
}
