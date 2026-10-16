package com.groupworks.app.message.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.groupworks.app.message.service.MessageService;
import com.groupworks.app.message.vo.MessageVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/message")
@RequiredArgsConstructor
public class MessageController {

	private final MessageService service;

	private static Map<String, Object> okay(String message) {
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "okay");
		map.put("message", message);
		return map;
	}

	// 쪽지함 (box=inbox 받은 쪽지, box=sent 보낸 쪽지)
	@GetMapping
	public Map<String, Object> list(@RequestParam(defaultValue = "inbox") String box) {
		Map<String, Object> map = okay(null);
		map.put("list", service.list(box));
		return map;
	}

	// 쪽지 보내기 (답장도 같은 API)
	@PostMapping
	public Map<String, Object> send(@RequestBody MessageVo vo) {
		service.send(vo);
		return okay("쪽지를 보냈습니다.");
	}

	// 내 쪽지함에서 삭제
	@DeleteMapping("{no}")
	public Map<String, Object> delete(@PathVariable String no) {
		service.delete(no);
		return okay("쪽지를 삭제했습니다.");
	}
}
