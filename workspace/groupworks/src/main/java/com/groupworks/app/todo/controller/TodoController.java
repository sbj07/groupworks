package com.groupworks.app.todo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groupworks.app.todo.service.TodoService;
import com.groupworks.app.todo.vo.TodoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/todo")
@RequiredArgsConstructor
public class TodoController {

	private final TodoService service;
	
	//할일 조회
	@GetMapping("list")
	public Map<String, Object> list() {
		List<TodoVo> todoList = service.list();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("todoList", todoList);
		if(todoList == null) {
			map.put("msg", "bad");
		}
		System.out.println(todoList);
		return map;
	}
	
	//할일 작성
	@PostMapping("write")
	public Map<String, String> write(TodoVo vo){
		int result = service.write(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		System.out.println(result);
		return map;
	}
	
	//할일 수정
	@PostMapping("edit")
	public Map<String, String> edit(TodoVo vo) {
		int result = service.edit(vo);
		Map<String, String> map = new HashMap<>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//할일 삭제
	@DeleteMapping
	public Map<String, String> delete(String no){
		int result = service.delete(no);
		Map<String, String> map = new HashMap<>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
}
