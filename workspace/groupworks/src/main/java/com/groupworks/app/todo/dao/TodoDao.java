package com.groupworks.app.todo.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.todo.vo.TodoVo;

@Repository
public class TodoDao {

	//할일조회
	public List<TodoVo> list(SqlSessionTemplate sst){
		return sst.selectList("TodoMapper.list");
	}
	
	//할일작성
	public int write(SqlSessionTemplate sst, TodoVo vo) {
		return sst.insert("TodoMapper.insert", vo);
	}
	
	//할일수정
	public int edit(SqlSessionTemplate sst, TodoVo vo) {
		return sst.update("TodoMapper.edit", vo);
	}
	
	//할일삭제
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("TodoMapper.delete", no);
	}
}
