package com.groupworks.app.todo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groupworks.app.todo.service.TodoService;
import com.groupworks.app.todo.vo.TodoVo;

import lombok.RequiredArgsConstructor;

/**
 * 할 일 (로그인한 본인 것만)
 */
@RestController
@RequestMapping("api/todo")
@RequiredArgsConstructor
public class TodoController {

	private final TodoService service;

	private static Map<String, Object> okay(String message) {
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "okay");
		map.put("message", message);
		return map;
	}

	@GetMapping
	public Map<String, Object> list() {
		Map<String, Object> map = okay(null);
		map.put("todoList", service.list());
		return map;
	}

	@PostMapping
	public Map<String, Object> write(@RequestBody TodoVo vo) {
		service.write(vo);
		return okay("할 일을 등록했습니다.");
	}

	@PutMapping("{no}")
	public Map<String, Object> edit(@PathVariable String no, @RequestBody TodoVo vo) {
		vo.setNo(no);
		service.edit(vo);
		return okay("할 일을 수정했습니다.");
	}

	@DeleteMapping("{no}")
	public Map<String, Object> delete(@PathVariable String no) {
		TodoVo vo = new TodoVo();
		vo.setNo(no);
		service.delete(vo);
		return okay("할 일을 삭제했습니다.");
	}
}
