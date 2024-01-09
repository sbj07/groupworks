package com.groupworks.app.todo.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import com.groupworks.app.todo.dao.TodoDao;
import com.groupworks.app.todo.vo.TodoVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {
	
	private final TodoDao dao;
	private final SqlSessionTemplate sst;
	
	//할일조회
	public List<TodoVo> list() {
		return dao.list(sst);
	}
	
	//할일작성
	public int write(TodoVo vo) {
		return dao.write(sst, vo);
	}
	
	//할일수정
	public int edit(TodoVo vo) {
		return dao.edit(sst, vo);
	}
	
	//할일삭제
	public int delete(String no) {
		return dao.delete(sst, no);
	}
	
}
