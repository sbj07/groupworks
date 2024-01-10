package com.groupworks.app.message.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groupworks.app.message.service.MessageService;
import com.groupworks.app.message.vo.MessageVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/message")
@RequiredArgsConstructor
public class MessageController {

	private final MessageService service;
	
	//보낸쪽지조회
	@GetMapping("sendList")
	public Map<String, Object> sendList(String MemberNo) {
		List<MessageVo> sendList = service.sendList(MemberNo);
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("sendList", sendList);
		if(sendList == null) {
			map.put("map", "bad");
		}
		return map;
 	}
	
	//받은쪽지조회
	@GetMapping("recieveList")
	public Map<String, Object> recieveList(String MemberNo) {
		List<MessageVo> recieveList = service.recieveList(MemberNo);
		Map<String, Object> map = new HashMap<>();
		map.put("msg",  "good");
		map.put("recieveList",  recieveList);
		if(recieveList == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//쪽지보내기
	@PostMapping("send")
	public Map<String, String> write(MessageVo vo) {
		int result = service.write(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//쪽지답장
	@PostMapping("recieve")
	public Map<String, String> reWrite(MessageVo vo) {
		int result = service.reWrite(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//쪽지삭제
	@DeleteMapping("delete")
	public void delete() {
		
	}
}
